from flask_wtf import FlaskForm
from wtforms.fields import (
    StringField, IntegerField
)
from flask_login import current_user
from wtforms.validators import DataRequired
from app.models import Tag


def tag_exists(form, field):
    tag_name = field.data
    tag_name = Tag.query.filter(Tag.name == tag_name and Tag.user_id == current_user.id).first()
    if tag_name:
        raise ValidationError("Tag name already present.")


class TagForm(FlaskForm):
    name = StringField("name", [DataRequired(), tag_exists])
    user_id = IntegerField("user_id",  [DataRequired()])
