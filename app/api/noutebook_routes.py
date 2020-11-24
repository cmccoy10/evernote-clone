from flask import Blueprint, jsonify, request
from flask import json
from flask_login import login_required
from app.models import Notebook
from app.models import db
from app.forms import NoteBookForm

notebook_routes = Blueprint('notebook', __name__)


@notebook_routes.route('/', methods=['GET'])
@login_required
def notebooks():
    notebooks = Notebook.query.filter_by(owner_id='from request or session?')
    return jsonify(notebooks=[notebook.to_dict() for notebook in notebooks])

@notebook_routes.route('/', methods=['POST'])
@login_required
def create_notebook():
    user_id = request.data.user_id # do we get user id from body or session?
    title = request.form.get('title') if request.form.get('title') else 'Untitled'
    is_default = True if title == 'Untitled' else False
    notebook = Notebook(owner_id=user_id, title=title, is_default=is_default, notes=[])
    db.session.add(notebook)
    db.session.commit()
    return jsonify(notebook=[notebook.to_dict()])

@notebook_routes.route('/<int:notebookId>', methods=['POST'])
@login_required
def update_notebook(notebookId):
    form = NoteBookForm()
    if form.validate_on_submit():
        title = request.form['title'] # only title can be changed?
        notebook = Notebook.query.get(notebookId)
        notebook.title = title
        db.session.commit(notebook)
        return jsonify(notebook=[notebook.to_dict()])
    return jsonify(error=[{'msg': 'please fill in all required fields'}])

@notebook_routes.route('/<int:notebookId>', methods=['DELETE'])
@login_required
def delete_notebook(notebookId):
    notebook = Notebook.query.get(notebookId)
    db.session.delete(notebook)
    db.session.commit()
    return jsonify(status='ok')
    
# cascade delete should be defined in models