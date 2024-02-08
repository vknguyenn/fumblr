from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import Length
from flask_wtf.file import FileField, FileAllowed
from app.api.aws_images import ALLOWED_EXTENSIONS
from app.models import Post

class PostForm(FlaskForm):
    post_title = StringField('Post Title', validators=[Length(min=1, max=55, message='Title must be between 1 and 55 characters')])
    image = FileField('image', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
    text = TextAreaField('text', validators=[Length(min=1, max=1200)])
    submit = SubmitField('Post')