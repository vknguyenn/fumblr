from flask import Blueprint, jsonify, request, redirect
# from flask_login import login_required, current_user
from app.models import db, Comment
# from app.forms.comment_form import CommentForm


comment_routes = Blueprint('comments', __name__)

def validation_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@comment_routes.route('')
def all_posts():
    comments = Comment.query.all()

    return {'comment': [comment.to_dict() for comment in comments]}