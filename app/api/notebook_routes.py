from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Notebook
from app.models import db
from app.forms import NotebookForm
from sqlalchemy.exc import SQLAlchemyError
from app.api.auth_routes import validation_errors_to_error_messages

notebook_routes = Blueprint('notebook', __name__)

# for testing purposes only
user = 1


@notebook_routes.route('', methods=['GET'])
@login_required
def notebooks():
    user_id = current_user.get_id()
    # user_id = user
    try:
        notebooks = Notebook.query.filter_by(owner_id=user_id)
        return jsonify(notebooks=[notebook.to_dict() for notebook
                                  in notebooks])
    except SQLAlchemyError as e:
        return jsonify(error={'msg': e._message()})


@notebook_routes.route('', methods=['POST'])
@login_required
def create_notebook():
    form = NotebookForm()
    user_id = current_user.get_id()
    form['owner_id'].data = user_id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            notebook = Notebook(
                owner_id=form.data['owner_id'], title=form.data['title'])
            db.session.add(notebook)
            db.session.commit()
            return notebook.to_dict()
        except SQLAlchemyError as e:
            return jsonify(error={'msg': e._message()})
    return {'errors': 'Please provide a name for your notebook.'}, 400


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
