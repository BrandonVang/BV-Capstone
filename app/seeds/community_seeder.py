from app.models import db, Community, environment, SCHEMA
from sqlalchemy.sql import text


def seed_community():
    com1 = Community(
        name="Dogs"
    )

    com2 = Community(
        name="Games"
    )

    com3 = Community(
        name="Sports"
    )

    com4 = Community(
        name="Jokes"
    )

    all_community = [com1, com2, com3, com4]
    add_posts = [db.session.add(community) for community in all_community]

    db.session.commit()
    return all_community


def undo_community():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.communities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM communities"))

    db.session.commit()
