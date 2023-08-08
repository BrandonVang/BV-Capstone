from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user_communities import user_community


class Community(db.Model):
    __tablename__ = 'communities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)


    posts = db.relationship("Post", back_populates="community")

    members = db.relationship(
        "User",
        secondary=user_community,
        back_populates="communities_joined"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
