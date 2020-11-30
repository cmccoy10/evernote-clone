from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired("Please provide a first name.")])
    last_name = StringField('last_name', validators=[DataRequired("Please provide a last name.")])
    email = StringField('email', validators=[
                        DataRequired("Please provide an e-mail."), Email(), user_exists])
    password = StringField('password', validators=[DataRequired("Please provide a password.")])
    