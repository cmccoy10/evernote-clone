from flask_wtf import FlaskForm
from wtforms.fields import (
    IntegerField
)
from wtforms.validators import DataRequired


class GetNotes(FlaskForm):
    user_id = IntegerField("user_id",  [DataRequired()])
