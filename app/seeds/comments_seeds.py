from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


from datetime import datetime

formatted_date = datetime.now()
datetime_formatted = formatted_date.strftime("%Y-%m-%d %H:%M:%S")

def seed_comments():

    comment1 = Comment(
        user_id=2,
        post_id=1,
        content="Take them out often!",
        post_date=datetime_formatted,
    )

    comment2 = Comment(
        user_id=3,
        post_id=1,
        content="Buy him something durable as the puppy will be teething",
        post_date=datetime_formatted,
    )

    comment3 = Comment(
        user_id=4,
        post_id=2,
        content="Your dog looks so precious!",
        post_date=datetime_formatted,
    )

    comment4 = Comment(
        user_id=5,
        post_id=2,
        content="He looks so small! I remember when my dog was still a puppy",
        post_date=datetime_formatted,
    )

    comment5 = Comment(
        user_id=1,
        post_id=3,
        content="I recommend just using kebble for now",
        post_date=datetime_formatted,
    )

    comment6 = Comment(
        user_id=3,
        post_id=3,
        content="Dont use high rich food as it might upset his stomach since hes still a puppy",
        post_date=datetime_formatted,
    )

    comment7 = Comment(
        user_id=5,
        post_id=4,
        content="He looks so cute!",
        post_date=datetime_formatted,
    )

    comment8 = Comment(
        user_id=1,
        post_id=4,
        content="I would love to have a corgi one day",
        post_date=datetime_formatted,
    )

    comment9 = Comment(
        user_id=2,
        post_id=5,
        content="Any dog is fine with me they all look so cute",
        post_date=datetime_formatted,
    )
    comment10 = Comment(
        user_id=3,
        post_id=5,
        content="I wish i can have a dog but i cant due to my lifestyle",
        post_date=datetime_formatted,
    )

    comment11 = Comment(
        user_id=4,
        post_id=6,
        content="Name him Bread!",
        post_date=datetime_formatted,
    )

    comment12 = Comment(
        user_id=5,
        post_id=6,
        content="Name him Bear",
        post_date=datetime_formatted,
    )

    comment13 = Comment(
        user_id=3,
        post_id=7,
        content="I walk my dog about an hour a day",
        post_date=datetime_formatted,
    )

    comment14 = Comment(
        user_id=2,
        post_id=7,
        content="My corgi i walk for an hour a day and play with him another hour later in the day",
        post_date=datetime_formatted,
    )

    comment15 = Comment(
        user_id=1,
        post_id=8,
        content="Great game, having a lot of fun",
        post_date=datetime_formatted,
    )

    comment16 = Comment(
        user_id=2,
        post_id=8,
        content="Highly recommend for people that love DND",
        post_date=datetime_formatted,
    )

    comment17 = Comment(
        user_id=4,
        post_id=9,
        content="Great game! Really love the difficulty",
        post_date=datetime_formatted,
    )

    comment18 = Comment(
        user_id=3,
        post_id=9,
        content="If you love Dark souls, you must play Elden Ring",
        post_date=datetime_formatted,
    )

    comment19 = Comment(
        user_id=4,
        post_id=10,
        content="IT was a pretty hype event",
        post_date=datetime_formatted,
    )

    comment20 = Comment(
        user_id=5,
        post_id=10,
        content="Great finals so far",
        post_date=datetime_formatted,
    )

    comment21 = Comment(
        user_id=1,
        post_id=11,
        content="At the moment no, i enjyoed the game but have too much games to play",
        post_date=datetime_formatted,
    )

    comment22 = Comment(
        user_id=2,
        post_id=11,
        content="Currently still playing!",
        post_date=datetime_formatted,
    )

    comment23 = Comment(
        user_id=3,
        post_id=12,
        content="Wonderful game!! If you enjoyed the first game, you'll enjoy the second",
        post_date=datetime_formatted,
    )

    comment24 = Comment(
        user_id=4,
        post_id=12,
        content="Haven't played it yet but will definitely get around to it",
        post_date=datetime_formatted,
    )

    comment25 = Comment(
        user_id=2,
        post_id=13,
        content="Mortal Combat super hyped for it",
        post_date=datetime_formatted,
    )

    comment26 = Comment(
        user_id=3,
        post_id=13,
        content="Looking forward for the new Assassin Creed game",
        post_date=datetime_formatted,
    )

    comment27 = Comment(
        user_id=4,
        post_id=14,
        content="Great update so far, playing a new run through with friends",
        post_date=datetime_formatted,
    )

    comment28 = Comment(
        user_id=5,
        post_id=14,
        content="Less bugs comapred to when the game launched thats for sure",
        post_date=datetime_formatted,
    )

    comment29 = Comment(
        user_id=3,
        post_id=15,
        content="Didnt really like it, something about it wasn't appealing",
        post_date=datetime_formatted,
    )

    comment30 = Comment(
        user_id=1,
        post_id=15,
        content="Bought it but i think this recent Final Fantasy doesnt have a lot of RPG elements",
        post_date=datetime_formatted,
    )
    comment31 = Comment(
        user_id=2,
        post_id=16,
        content="That was one nail biter game",
        post_date=datetime_formatted,
    )

    comment32 = Comment(
        user_id=1,
        post_id=16,
        content="Such a back and forth game",
        post_date=datetime_formatted,
    )

    comment33 = Comment(
        user_id=2,
        post_id=17,
        content="Excited to see whats gonna happen in the new season",
        post_date=datetime_formatted,
    )

    comment34 = Comment(
        user_id=3,
        post_id=17,
        content="A lot of new changes within teams, excited for the new season",
        post_date=datetime_formatted,
    )

    comment35 = Comment(
        user_id=4,
        post_id=18,
        content="It will be in 2024 in Paris!",
        post_date=datetime_formatted,
    )

    comment36 = Comment(
        user_id=5,
        post_id=18,
        content="After FIFA excited to watch Olympics!",
        post_date=datetime_formatted,
    )

    comment37 = Comment(
        user_id=1,
        post_id=19,
        content="What a cliche joke",
        post_date=datetime_formatted,
    )

    comment38 = Comment(
        user_id=2,
        post_id=19,
        content="That is a good joke, I will keep in mind",
        post_date=datetime_formatted,
    )

    comment39 = Comment(
        user_id=3,
        post_id=20,
        content="I'm definitely using this joke at the next party!",
        post_date=datetime_formatted,
    )

    comment40 = Comment(
        user_id=4,
        post_id=20,
        content="You've got a galaxy of puns up your sleeve!",
        post_date=datetime_formatted,
    )

    comment41 = Comment(
        user_id=2,
        post_id=21,
        content="You've got a galaxy of puns up your sleeve!",
        post_date=datetime_formatted,
    )

    comment42 = Comment(
        user_id=3,
        post_id=21,
        content="I'm definitely using this joke at the next party!",
        post_date=datetime_formatted,
    )






    all_comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20, comment21, comment22, comment23, comment24, comment25, comment26, comment27, comment28, comment29, comment30, comment31, comment32, comment33, comment34, comment35, comment36, comment37, comment38, comment39, comment40, comment41, comment42]
    add_comments = [db.session.add(comment) for comment in all_comments]

    db.session.commit()
    return all_comments


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
