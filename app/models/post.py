from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_title = db.Column(db.String(55))
    text = db.Column(db.String(1200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    image_url = db.Column(db.String)

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")
    images = db.relationship("Image", back_populates="post", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_title': self.post_title,
            'image_url': self.image_url,
            'text': self.text,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }


