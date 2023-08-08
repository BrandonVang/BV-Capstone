from .db import db, environment, SCHEMA, add_prefix_for_prod



class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)
    post_date = db.Column(db.String, nullable=False)

    #relationship attributes
    users = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="posts", cascade="all, delete")
    likes = db.relationship("Like", back_populates="posts", cascade="all, delete")
    medias = db.relationship("Media", back_populates="posts", cascade="all, delete")
    # community = db.relationship("Community", back_populates="members", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "postDate": self.post_date,
            "user": self.users.to_dict(),
            "medias": [media.to_dict() for media in self.medias],
            "comments": [comment.to_dict() for comment in self.comments],
            "likes":[like.to_dict() for like in self.likes],
            "comments_count": len(self.comments),
            "likes_count": len(self.likes)
        }

    def to_dict_no_user(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "postDate": self.post_date,
            "medias": self.medias.to_dict(),
            "comments": [comment.to_dict() for comment in self.comments],
            "likes":[like.to_dict() for like in self.likes]
        }
