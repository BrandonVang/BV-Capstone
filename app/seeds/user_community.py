from app.models import db, Community, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_user_community():

    user1_id = "Demo"
    user2_id = "marnie"
    user3_id = "bobbie"
    user4_id = "test"
    user5_id = "dummy"
    user6_id = "dummy1"
    user7_id = "dummy2"
    user8_id = "dummy3"
    user9_id = "dummy4"
    user10_id = "dummy5"
    com1="Dogs"
    com2="Games"
    com3="Sports"
    com4="Jokes"




    user1 = User.query.filter_by(username=user1_id).first()
    user2 = User.query.filter_by(username=user2_id).first()
    user3 = User.query.filter_by(username=user3_id).first()
    user4 = User.query.filter_by(username=user4_id).first()
    user5 = User.query.filter_by(username=user5_id).first()
    user6 = User.query.filter_by(username=user6_id).first()
    user7 = User.query.filter_by(username=user7_id).first()
    user8 = User.query.filter_by(username=user8_id).first()
    user9 = User.query.filter_by(username=user9_id).first()
    user10 = User.query.filter_by(username=user10_id).first()

    community1= Community.query.filter_by(name=com1).first()
    community2= Community.query.filter_by(name=com2).first()
    community3= Community.query.filter_by(name=com3).first()
    community4= Community.query.filter_by(name=com4).first()

    # Add users to communities using the user_community table
    user_community_data = [
        {"user": user1, "community": community1},
        {"user": user1, "community": community2},
        {"user": user2, "community": community1},
        {"user": user2, "community": community2},
        {"user": user3, "community": community3},
        {"user": user3, "community": community4},
        {"user": user4, "community": community4},
        {"user": user4, "community": community2},
        {"user": user5, "community": community1},
        {"user": user5, "community": community2},
        {"user": user6, "community": community3},
        {"user": user6, "community": community4},
        {"user": user7, "community": community1},
        {"user": user7, "community": community3},
        {"user": user8, "community": community4},
        {"user": user8, "community": community2},
        {"user": user9, "community": community1},
        {"user": user9, "community": community2},
        {"user": user10, "community": community2},
        {"user": user10, "community": community3},

    ]

    for entry in user_community_data:
        entry["community"].members.append(entry["user"])

    db.session.commit()

def undo_user_community():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_communities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_communities"))

    db.session.commit()
