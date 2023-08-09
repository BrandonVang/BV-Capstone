from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
# from ..routes.AWS_helpers import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    title = StringField("Content", validators=[DataRequired(), Length(max=200, min=5)])
    content = StringField("Content", validators=[DataRequired(), Length(max=2000, min=5)])
    submit = SubmitField("Submit")
