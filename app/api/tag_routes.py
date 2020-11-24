from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import db, Tag, User, Note, Notebook
from app.forms import TagForm
from app.api.auth_routes import validation_errors_to_error_messages

tag_routes = Blueprint('tags', __name__)


@tag_routes.route('/')
# @login_required
def load_tags():
    user_id = current_user.get_id()
    tags = Tag.query.filter(Tag.user_id == user_id).order_by(Tag.name).all()
    return {'tags': [tag.to_dict() for tag in tags]}


@tag_routes.route('/', methods=['POST'], strict_slashes=False)
# @login_required
def make_new_tag():
    user_id = current_user.get_id()
    form = TagForm()
    form['user_id'].data = user_id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_tag = Tag(
            name=form.data['name'],
            user_id=user_id
        )
        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@tag_routes.route('/<int:tag_id>', methods=['PUT'])
# @login_required
def edit_tag(tag_id):
    user_id = current_user.get_id()
    form = TagForm()
    form['user_id'].data = user_id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tag = Tag.query.get(tag_id)
        tag.name = form.data['name']
        db.session.commit()
        return tag.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@tag_routes.route('/<int:tag_id>', methods=['DELETE'])
# @login_required
def delete_tag(tag_id):
    user_id = current_user.get_id()
    try:
        tag = Tag.query.get(tag_id)
        # for note_tag in tag.notes:
        #     db.session.delete(note_tag)
        db.session.delete(tag)
        db.session.commit()
        return {'message': 'Tag successfully deleted.'}
    except:
        return {'error': 'Tag not found.'}
