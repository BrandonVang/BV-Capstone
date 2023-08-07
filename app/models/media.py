from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy

class Media(db.Model):
    __tablename__ = 'medias'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    media_type = db.Column(db.String, nullable=False)
    media_url = db.Column(db.String, nullable=False)

    posts = db.relationship('Post', back_populates='medias')

    #dict
    def to_dict(self):
        return {
            "id": self.id,
            "media_url": self.media_url,
            "media_type": self.media_type,
            "post_id": self.post_id
    }
