from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Follow

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('')
def get_follows():
    follows = Follow.query.all()

    return [follow.to_dict() for follow in follows]

@follow_routes.route('/<int:followedId>', methods=['POST'])
@login_required
def followed(followedId):
    followerId = current_user
    follow = Follow(followerId=followerId, followedId=followedId)
    db.session.add(follow)
    db.session.commit()
    return follow.to_dict()

@follow_routes.route('/<int:followId>', methods=['DELETE'])
@login_required
def unfollow(followId):
    follow = Follow.query.get(followId)
    db.session.delete(follow)
    db.session.commit()
    return {"message": 'Successfully unfollowed'}