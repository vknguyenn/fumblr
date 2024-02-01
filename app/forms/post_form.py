from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed
from app.api.aws_images import ALLOWED_EXTENSIONS
from app.models import Post

class PostForm(FlaskForm):
    post_title = StringField('Post Title', validators=[Length(min=1, max=255, message='Title must be between 1 and 255 characters')])
    image = FileField('image', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
    text = TextAreaField('text', validators=[DataRequired()])
    submit = SubmitField('Post')