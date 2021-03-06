from flask_wtf import FlaskForm
from wtforms.fields import (
    StringField, IntegerField, BooleanField
)
from wtforms.validators import DataRequired


class NotebookForm(FlaskForm):
    title = StringField("title", [DataRequired()])
    owner_id = IntegerField("owner_id")
    is_default = BooleanField("is_default")
