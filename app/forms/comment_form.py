from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Comment

class CommentForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired(), Length(max=200, min=10)] )
    submit = SubmitField("Submit")
