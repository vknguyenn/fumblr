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



@comment_routes.route('/manage')
@login_required
def manage_comments():
    user_comments = Comment.query.filter_by(user_id=current_user.id).all()
    return {'user_comments': [comment.to_dict() for comment in user_comments]}


@comment_routes.route('/<int:id>')
@login_required
def post_comments(id):
    comments = Comment.query.filter_by(post_id=id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


    
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    edit_comment = Comment.query.get(id)

    if edit_comment is None:
        return {"message": "Comment not found"}, 404

    if edit_comment.user_id != current_user.id:
        return {"message": "Unauthorized to edit this comment"}, 403
    
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        edit_comment.comment = data['comment']

        db.session.commit()

        return edit_comment.to_dict()
    
    return {'errors': validation_error_messages(form.errors)}, 400

@comment_routes.route('<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    remove_comment = Comment.query.get(id)

    if remove_comment is None:
        return {"message": "Comment not found"}, 404

    if remove_comment.user_id != current_user.id:
        return {"message": "Unauthorized to edit this comment"}, 403
    
    db.session.delete(remove_comment)
    db.session.commit()
    return {"message": "successfully deleted"}

