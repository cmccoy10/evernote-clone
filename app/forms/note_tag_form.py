from flask_wtf import FlaskForm
from wtforms.fields import IntegerField
from wtforms.validators import DataRequired
from app.models import Tag


class NoteTagForm(FlaskForm):
    note_id = IntegerField("note_id", [DataRequired()])
    tag_id = IntegerField("tag_id",  [DataRequired()])
