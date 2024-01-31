from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post
from app.forms.post_form import PostForm


post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def all_posts():
    posts = Post.query.all()

    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/new', methods=['GET', 'POST'])
@login_required
def new_form():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            user_id=current_user.id,
            text=form.data['text']
        )
        db.session.add(post)
        db.session.commit()
        return {'post': post.to_dict()}