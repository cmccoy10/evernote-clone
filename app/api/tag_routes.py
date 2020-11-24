from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import Tag, User, Note, Notebook


tag_routes = Blueprint('tags', __name__)


@tag_routes.route('/')
@login_required
def load_tags():
    user_id = current_user.get_id()
    tags = Tag.query.filter(Tag.user_id == user_id)
    return tags


@tag_routes.route('/', methods=['POST'])
@login_required
def make_new_tag():
    user_id = current_user.get_id()
    form = NewTagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_tag = Tag(
            name=form.data['name'],
            user_id=user_id
        )
        # associate to tag
        return new_tag
    return 


@tag_routes.route('/<int:tag_id>', methods=['PUT'])
@login_required
def edit_tag():
    user_id = current_user.get_id()


@tag_routes.route('/<int:tag_id>', methods=['DELETE'])
@login_required
def delete_tag():
    user_id = current_user.get_id()
