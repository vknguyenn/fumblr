from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Like


like_routes = Blueprint('likes', __name__)

@like_routes.route('')
def all_likes():
    likes = Like.query.all()

    return {'likes': [like.to_dict() for like in likes]}

@like_routes.route('<int:postId>', methods=['POST'])
@login_required
def create_like(postId):
        

        existing_like = Like.query.filter_by(postId=postId, userId=current_user.id).first()
        if existing_like:
             return jsonify({'message': 'Like already exists', 'likeId': existing_like.id}), 200
        if not existing_like: 
            new_like = Like(postId=postId, userId=current_user.id)
            db.session.add(new_like)
            db.session.commit()

        return jsonify(new_like.to_dict()), 201


@like_routes.route('/<int:likeId>', methods=["DELETE"])
@login_required
def remove_like(likeId):
    like = Like.query.get(likeId)
    if like is None:
        return jsonify({'error': 'Like not found.'}), 404
    
    db.session.delete(like)
    db.session.commit()
    return {"message": "Like removed"}