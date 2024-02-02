from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Post, Image
from app.forms.post_form import PostForm
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

    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('', methods=['POST'])
@login_required
def new_form():
    form = PostForm(request.form)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = request.files.get('image')

        upload_img_url = None   
        if image:
            image.filename = get_unique_filename_img(image.filename)
            upload_img = upload_img_to_s3(image)

            if 'url' in upload_img:
                upload_img_url = upload_img['url']
            else:
                return {'errors': validation_error_messages(upload_img)}, 400

            
            
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
    
# @post_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_post(id):
#     form = PostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         edited_post = Post.query.get(id)
#         edited_post.post_title=form.data['post_title']
#         edited_post.image_url=form.data['image_url']
#         edited_post.text=form.data['text']
#         db.session.commit()
#         return redirect('/')

@post_routes.route('<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return {'message': 'sucessfully deleted'}
