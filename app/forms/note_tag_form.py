from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, StringField
from wtforms.validators import DataRequired


class NoteTagForm(FlaskForm):
    name = StringField("name", [DataRequired()])
    user_id = IntegerField("user_id",  [DataRequired()])
