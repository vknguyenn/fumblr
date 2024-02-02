from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms.comment_form import CommentForm


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

@comment_routes.route('/new', methods=["POST"])
@login_required
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        created_comment = Comment(
            comment = data["comment"],
            userId=current_user.id, 
        )

        db.session.add(created_comment)
        db.session.commit()

        return {'created_comment': created_comment.to_dict()}
