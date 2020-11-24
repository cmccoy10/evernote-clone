from flask_wtf import FlaskForm
from wtforms.fields import (
    StringField, TextAreaField
)


class NoteUpdateForm(FlaskForm):
    title = StringField("title")
    body = TextAreaField("body")
