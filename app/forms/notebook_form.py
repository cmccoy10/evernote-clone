from flask_wtf import FlaskForm
from wtforms.fields import (
    StringField, IntegerField, BooleanField
)
from wtforms.validators import DataRequired


class NotebookForm(FlaskForm):
    title = StringField("title")
    owner_id = IntegerField("owner_id", [DataRequired()])
    is_default = BooleanField("is_default", [DataRequired()])
