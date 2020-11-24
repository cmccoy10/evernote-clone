from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import db, Tag, User, Note, Notebook
from app.froms import TagForm

tag_routes = Blueprint('tags', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@tag_routes.route('/')
@login_required
def load_tags():
    user_id = current_user.get_id()
    tags = Tag.query.filter_by(Tag.user_id == user_id).all()
    return { 'tags': [tag.to_dict() for tag in tags] }


@tag_routes.route('/', methods=['POST'])
@login_required
def make_new_tag():
    user_id = current_user.get_id()
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_tag = Tag(
            name=form.data['name'],
            user_id=user_id
        )
        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors) }


@tag_routes.route('/<int:tag_id>', methods=['PUT'])
@login_required
def edit_tag(tag_id):
    user_id = current_user.get_id()
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tag = Tag.query.get(tag_id)
        tag.name = form.data['name']
        db.session.commit()
        return tag.to_dict()
    return { 'errors': validation_errors_to_error_messages(form.errors) }


@tag_routes.route('/<int:tag_id>', methods=['DELETE'])
@login_required
def delete_tag(tag_id):
    user_id = current_user.get_id()
    try:
        tag = Tag.query.get(tag_id)
        db.session.delete(tag)
        db.session.commit()
        return { 'message': 'Tag successfully deleted.'}
    except:
        return { 'error': 'Tag not found.' }