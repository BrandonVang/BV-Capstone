from app.models import db, Post, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


formatted_date = datetime.now()
datetime_formatted = formatted_date.strftime("%Y-%m-%d %H:%M:%S")

def seed_posts():
    post1 = Post(
        title="Advice on my little puppy", content="Had my dog for a few weeks, just wondering what type of toys are good for him?", user_id=1, community_id=1, post_date = datetime_formatted)
    post2 = Post(
        title="look at my dog!", content="Look at my puppers hes growing up!", user_id=1, community_id=1, post_date = datetime_formatted)
    post3 = Post(
        title="Whats the best treats for training", content="Have a little puppy that is arriving soon and i was just wondering what treats are good to use for training purposes", user_id=2, community_id=1, post_date = datetime_formatted)
    post4 = Post(
        title="My little bread loaf", content= "My little corgi is a little trouble maker", user_id=2, community_id=1, post_date = datetime_formatted)
    post5 = Post(
        title="What kind of dogs do people like?", content= "I was wondering whats everyone favorite dog breed", user_id=3, community_id=1, post_date = datetime_formatted)
    post6 = Post(
        title="Getting a puppy soon what should i name him", content="Base off the title anyone have recomendations?", user_id=3, community_id=1, post_date = datetime_formatted)
    post7 = Post(
        title="How often do you play with your dog", content="I was curious to how long should you play with your dog or go on a walk with them?", user_id=4,  community_id=1, post_date = datetime_formatted)
    post8 = Post(
        title="Baldur Gate 3?", content="What are peopel thoughts on Baldur Gate 3", user_id=4, community_id=2, post_date = datetime_formatted)
    post9 = Post(
        title="Elden Ring", content="Elden ring is such a good game", user_id=5, community_id=2, post_date = datetime_formatted)
    post10 = Post(
        title="Anyone watching Evo?", content="The Evo event was pretty hype, considering someone won blind folded", user_id=5, community_id=2, post_date = datetime_formatted)
    post11 = Post(
        title="Diablo 4", content="Aynone still playing Diablo 4 Season 1", user_id=1, community_id=2, post_date = datetime_formatted)
    post12 = Post(
        title="God of War 2", content="One of the best games to play, highly recommend to anyone that hasnt played it", user_id=2, community_id=2, post_date = datetime_formatted)
    post13 = Post(
        title="New Games?", content="Any new games that are on people list", user_id=1, community_id=2, post_date = datetime_formatted)
    post14 = Post(
        title="Dying light 2", content="What are people thoughts about the new update for DL2", user_id=2, community_id=2, post_date = datetime_formatted)
    post15 = Post(
        title="Final Fantasy 16", content="Thoughts on the new Final Fantasy game?", user_id=3, community_id=2, post_date = datetime_formatted)
    post16 = Post(
        title="USA KNOCKED OUT", content="After a nail biter game between Sweden USA is knocked out of the Woman FIFA cup", user_id=3, community_id=3, post_date=datetime_formatted)
    post17 = Post(
        title="NBA", content="Anyone excited for the new season of NBA", user_id=4, community_id=3, post_date=datetime_formatted)
    post18 = Post(
        title="When is the Olypmics?", content="Where and when is the Olympics, is it in 2024?", user_id=4, community_id=3, post_date=datetime_formatted)
    post19 = Post(
        title="Coding Joke",content="Why do programmers prefer dark mode? Because light attracts bugs", user_id=2, community_id=4, post_date=datetime_formatted)
    post20 = Post(
        title="How many developers does it take to screw in a lightbulb?", content="None. Its a hardware problem", user_id=1, community_id=4, post_date=datetime_formatted)
    post21 = Post(
        title="Whats a better name for Frontend Developers?", content="They are called div elopers", user_id=5, community_id=4, post_date=datetime_formatted)


    posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15, post16, post17, post18, post19, post20, post21]
    add_posts = [db.session.add(post) for post in posts]


    db.session.commit()
    return posts


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
