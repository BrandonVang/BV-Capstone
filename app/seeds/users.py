from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    test = User(
        username="test", email="testing@aa.io", password='password')
    dummy = User(
        username="dummy", email="dummy@aa.io", password='password')
    dummy1 = User(
        username="dummy1", email="dummy1@aa.io", password='password')
    dummy2 = User(
        username="dummy2", email="dummy2@aa.io", password='password')
    dummy3 = User(
        username="dummy3", email="dummy3@aa.io", password='password')
    dummy4 = User(
        username="dummy4", email="dummy4@aa.io", password='password')
    dummy5 = User(
        username="dummy5", email="dummy5@aa.io", password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(test)
    db.session.add(dummy)
    db.session.add(dummy1)
    db.session.add(dummy2)
    db.session.add(dummy3)
    db.session.add(dummy4)
    db.session.add(dummy5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
