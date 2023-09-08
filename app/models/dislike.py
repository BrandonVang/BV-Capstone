from .db import db, environment, SCHEMA, add_prefix_for_prod


class Dislike(db.Model):
    __tablename__='dislikes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,nullable=False, primary_key=True)
    user_id  = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)

#Relationship

    users = db.relationship("User", back_populates="dislikes")
    posts = db.relationship("Post", back_populates="dislikes")

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "post_id":self.post_id,
            "username": self.users.username
        }
