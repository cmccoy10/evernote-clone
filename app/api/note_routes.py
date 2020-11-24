from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Note
from flask_login import current_user

note_routes = Blueprint('notes', __name__)


@note_routes.route('/')
def get_notes():
    user_id = current_user.get_id()
    notes = Note.query.filter_by(user_id == user_id).all()
    return {"notes": [note.to_dict() for note in notes]}


@note_routes.route('/notes', methods=["POST"])
def create_note():
    form = CreateNote()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.get_id()
        note = Note(
            title=form.data['title'],
            body=form.data['body'],
            user_id=user_id,
            notebook_id=form.data['notebook_id']
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
