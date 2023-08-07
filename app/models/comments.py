from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy import DateTime

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    content = db.Column(db.Text, nullable=False)
    post_date = db.Column(db.String, nullable=False)

    #Relationships
    users = db.relationship("User", back_populates="comments")
    posts = db.relationship("Post", back_populates="comments")


    #dict
    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "post_date": self.post_date,
            "username": self.users.username
    }
