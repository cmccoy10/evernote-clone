from flask import Blueprint, jsonify, request, Response
from flask_login import login_required, current_user
from app.models import Note, Tag, note_tag, db
from app.forms import NoteForm, NoteUpdateForm, TagForm, NoteTagForm, GetNotes
from app.api.auth_routes import validation_errors_to_error_messages

note_routes = Blueprint('notes', __name__)


@note_routes.route('/')
@login_required
def get_notes():
    user_id = current_user.get_id()
    notes = Note.query.filter_by(user_id = user_id).all()
    return {"notes": [note.to_dict() for note in notes]}


@note_routes.route('/', methods=["POST"], strict_slashes=False)
@login_required
def create_note():
    form = NoteForm()
    user_id = current_user.get_id()
    form['user_id'].data = user_id
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


@note_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_note(id):
    try:
        note = Note.query.get(id)
        db.session.delete(note)
        db.session.commit()
        return "Successful"
    except:
        return {"errors": ["Note does not exist"]}


@note_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_note(id):
    form = NoteUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Note.query.get(id)
        note.title = form.data['title']
        note.body = form.data['body']
        db.session.commit()
        return note.to_dict()


@note_routes.route('/<int:id>/tags', methods=["POST"])
@login_required
def create_note_tag(id):
    form = NoteTagForm()
    user_id = current_user.get_id()
    form['user_id'].data = user_id
    form['csrf_token'].data = request.cookies['csrf_token']
    tag_name = form.data['name']
    tag = Tag.query.filter_by(name = tag_name, user_id = user_id).first()

    if tag:
        note = Note.query.get(id)
        tag.notes.append(note)
        db.session.commit()
        return {"note_id":note.id}
    else:
        if form.validate_on_submit():
            new_tag = Tag(
                name=form.data["name"],
                user_id=form.data["user_id"]
            )
            note = Note.query.get(id)
            new_tag.notes.append(note)
            db.session.add(new_tag)
            db.session.commit()
            return new_tag.to_dict()


@note_routes.route('/<int:note_id>/tags/<int:tag_id>', methods=["DELETE"])
@login_required
def delete_note_tag(note_id, tag_id):
    note = Note.query.get(note_id)
    tag = Tag.query.get(tag_id)
    tag.notes.remove(note)
    db.session.commit()
    return {"message":"Successful"}
