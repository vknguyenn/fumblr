from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    image_url = db.Column(db.String, nullable=True)

    post = db.relationship("Post", back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'image_url': self.image_url,
        }