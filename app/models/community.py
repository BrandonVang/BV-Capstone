from .db import db, environment, SCHEMA, add_prefix_for_prod



community =db.Table(
    'communities',
    db.Model.metadata,
    db.Column('follower_id',db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('followed_id',db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)

if environment == "production":
    community.schema = SCHEMA
