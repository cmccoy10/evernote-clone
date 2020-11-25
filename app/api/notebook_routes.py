from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Notebook
from app.models import db
from app.forms import NotebookForm
from sqlalchemy.exc import SQLAlchemyError

notebook_routes = Blueprint('notebook', __name__)

# for testing purposes only
user = 1


@notebook_routes.route('/', methods=['GET'])
# @login_required
def notebooks():
    # user_id = current_user.get_id()
    user_id = user
    try:
        notebooks = Notebook.query.filter_by(owner_id=user_id)
        return jsonify(notebooks=[notebook.to_dict() for notebook
                                  in notebooks])
    except SQLAlchemyError as e:
        return jsonify(error={'msg': e._message()})


@notebook_routes.route('/', methods=['POST'])
# @login_required
def create_notebook():
    # user_id = current_user.get_id()
    user_id = user
    title = request.form.get('title') if request.form.get(
        'title') else 'Untitled'
    is_default = True if title == 'Untitled' else False
    try:
        notebook = Notebook(owner_id=user_id, title=title,
                            is_default=is_default)
        db.session.add(notebook)
        db.session.commit()
        return jsonify(notebook=[notebook.to_dict()])
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify(error={'msg': e._message()})


@notebook_routes.route('/<int:notebookId>', methods=['POST'])
# @login_required
def update_notebook(notebookId):
    form = NotebookForm()
    if form.validate_on_submit():
        title = request.form['title']
        try:
            notebook = Notebook.query.get(notebookId)
            notebook.title = title
            db.session.commit(notebook)
            return jsonify(notebook=[notebook.to_dict()])
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify(error={'msg': e._message()})
    return jsonify(error=[{'msg': 'please fill in all required fields'}])


@notebook_routes.route('/<int:notebookId>', methods=['DELETE'])
# @login_required
def delete_notebook(notebookId):
    try:
        notebook = Notebook.query.get(notebookId)
        db.session.delete(notebook)
        db.session.commit()
        return jsonify(status='ok')
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify(error={'msg': e._message()})
