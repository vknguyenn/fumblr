from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Post, Comment
from app.forms.post_form import PostForm
from app.forms.comment_form import CommentForm
from app.api.aws_images import upload_img_to_s3, get_unique_filename_img, remove_img_from_s3


post_routes = Blueprint('posts', __name__)

def validation_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@post_routes.route('')
def all_posts():
    posts = Post.query.all()
    comments = Comment.query.all()

    return {'posts': [post.to_dict() for post in posts],
            'comment': [comment.to_dict() for comment in comments]}

@post_routes.route('/manage', methods=['GET'])
@login_required
def manage_posts():
    user_posts = Post.query.filter_by(user_id=current_user.id).all()
    return {'user_posts': [post.to_dict() for post in user_posts]}


@post_routes.route('/<int:id>', methods=['GET'])
@login_required
def one_post(id):
    post = Post.query.get(id)
    if not post:
        return {"message": "Post not found"}, 404
    return {'post': [post.to_dict()]}


@post_routes.route('', methods=['POST'])
@login_required
def new_form():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        image_url = data['image']

        upload_img_url = None   
        if image_url:
            image_url.filename = get_unique_filename_img(image_url.filename)
            upload_img = upload_img_to_s3(image_url)

            if 'url' in upload_img:
                upload_img_url = upload_img['url']
            else:
                return validation_error_messages(upload_img), 400

            
            
        post = Post(
            user_id=current_user.id,
            post_title=form.data['post_title'],
            text=form.data['text'],
            image_url = upload_img_url
        )
        db.session.add(post)
        db.session.commit()
    
        return post.to_dict()

    return {'errors': validation_error_messages(form.errors)}, 400
    
@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_post(id):
    post = Post.query.get(id)
    if post is None:
        return {"message": "Post not found"}, 404

    if post.user_id != current_user.id:
        return {"message": "Unauthorized to edit this post"}, 403

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        image_url = data.get('image') 

        upload_img_url = post.image_url
        if image_url:
            image_url.filename = get_unique_filename_img(image_url.filename)
            upload_img = upload_img_to_s3(image_url)

            if 'url' in upload_img:
                upload_img_url = upload_img['url']
            else:

                return validation_error_messages(upload_img), 400

        post.post_title = form.data['post_title']
        post.text = form.data['text']
        post.image_url = upload_img_url

        db.session.commit()

        return post.to_dict()

    return {'errors': validation_error_messages(form.errors)}, 400

@post_routes.route('<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)

    if post is None:
        return {"message": "Post not found"}, 404
    
    if post.user_id != current_user.id:
        return {"message": "Unauthorized to delete this post"}, 403
    

    if post.image_url:
        remove_img_from_s3(post.image_url)

    db.session.delete(post)
    db.session.commit()
    return {'message': 'sucessfully deleted'}

@post_routes.route('/<int:postId>/comments', methods=['POST'])
@login_required
def create_comment(postId):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        comment_text = form.comment.data.get('comment')

        created_comment = Comment(
            comment=comment_text,
            user_id = current_user.id,
            post_id = postId
        )
        db.session.add(created_comment)
        db.session.commit()
        return jsonify({'comment': created_comment.to_dict()}), 200
    else:
        return jsonify({'errors': form.errors}), 400