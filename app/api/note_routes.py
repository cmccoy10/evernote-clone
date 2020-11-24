from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Note, db
from flask_login import current_user
from app.forms import NoteForm
from app.api.auth_routes import validation_errors_to_error_messages

note_routes = Blueprint('notes', __name__)


@note_routes.route('/')
def get_notes():
    user_id = current_user.get_id()
    notes = Note.query.filter_by(user_id = user_id).all()
    return {"notes": [note.to_dict() for note in notes]}


@note_routes.route('/', methods=["POST"], strict_slashes=False)
def create_note():
    form = NoteForm()
    user_id = current_user.get_id()
    form['user_id'].data = 1 #user_id
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Note(
            title=form.data['title'],
            body=form.data['body'],
            user_id=form.data['user_id'],
            notebook_id=form.data['notebook_id']
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
