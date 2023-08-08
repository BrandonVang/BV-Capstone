from .db import db, environment, SCHEMA, add_prefix_for_prod



class Community(db.Model):
    __tablename__ = 'communities',

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)


    members = db.relationship(
        "User",
        secondary='user_communities',
        back_populates="communities_joined"
    )


