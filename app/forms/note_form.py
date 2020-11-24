from flask_wtf import FlaskForm
from wtforms.fields import (
    StringField, TextAreaField
)
from wtforms.validators import DataRequired


class NoteForm(FlaskForm):
    title = StringField("title")
    body = TextAreaField("body")
    user_id = IntegerField("user_id",  [DataRequired()])
    notebook_id = IntegerField("notebook_id", [DataRequired()])
