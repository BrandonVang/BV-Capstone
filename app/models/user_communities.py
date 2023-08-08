from .db import db, environment, SCHEMA, add_prefix_for_prod



user_community =db.Table(
    'user_communities',
    db.Model.metadata,
    db.Column('user_id',db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('community_id',db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), primary_key=True)
)

if environment == "production":
    user_community.schema = SCHEMA
