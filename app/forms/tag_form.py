from flask_wtf import FlaskForm
from wtforms.fields import (
    StringField, IntegerField
)
from wtforms.validators import DataRequired, ValidationError
from app.models import Tag


def tag_exists(form, field):
    tag_name = form.data['name']
    tag_user_id = field.data
    tag = Tag.query.filter(Tag.name == tag_name, Tag.user_id == tag_user_id).first()
    if tag:
        raise ValidationError("Tag name already present.")


class TagForm(FlaskForm):
    name = StringField("name", [DataRequired()])
    user_id = IntegerField("user_id",  [DataRequired(), tag_exists])
