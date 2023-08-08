from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    like1 = Like(user_id=1, post_id=1)
    like2 = Like(user_id=2, post_id=1)
    like3 = Like(user_id=3, post_id=1)
    like4 = Like(user_id=1, post_id=3)
    like5 = Like(user_id=2, post_id=3)
    like6 = Like(user_id=1, post_id=4)
    like7 = Like(user_id=3, post_id=5)
    like8 = Like(user_id=4, post_id=2)
    like9 = Like(user_id=5, post_id=2)
    like10 = Like(user_id=2, post_id=2)
    like11 = Like(user_id=4, post_id=3)
    like12 = Like(user_id=5, post_id=4)
    like13 = Like(user_id=3, post_id=5)
    like14 = Like(user_id=4, post_id=6)
    like15 = Like(user_id=5, post_id=6)
    like16 = Like(user_id=4, post_id=7)
    like17 = Like(user_id=5, post_id=8)
    like18 = Like(user_id=1, post_id=9)
    like19 = Like(user_id=2, post_id=10)
    like20 = Like(user_id=3, post_id=10)
    like21 = Like(user_id=4, post_id=11)
    like22 = Like(user_id=5, post_id=12)
    like23 = Like(user_id=2, post_id=13)
    like24 = Like(user_id=3, post_id=14)
    like25 = Like(user_id=4, post_id=15)
    like26 = Like(user_id=5, post_id=16)
    like27 = Like(user_id=1, post_id=17)
    like28 = Like(user_id=2, post_id=18)
    like29 = Like(user_id=3, post_id=19)
    like30 = Like(user_id=4, post_id=20)
    like31 = Like(user_id=5, post_id=20)
    like32 = Like(user_id=2, post_id=20)
    like33 = Like(user_id=3, post_id=18)
    like34 = Like(user_id=4, post_id=19)
    like35 = Like(user_id=5, post_id=21)
    like36 = Like(user_id=1, post_id=21)
    like37 = Like(user_id=2, post_id=21)
    like38 = Like(user_id=3, post_id=20)
    like39 = Like(user_id=4, post_id=14)
    like40 = Like(user_id=5, post_id=13)
    like41 = Like(user_id=2, post_id=12)
    like42 = Like(user_id=3, post_id=11)
    like43 = Like(user_id=1, post_id=10)
    like44 = Like(user_id=2, post_id=9)
    like45 = Like(user_id=1, post_id=16)
    like46 = Like(user_id=2, post_id=8)
    like47 = Like(user_id=3, post_id=8)
    like48 = Like(user_id=4, post_id=4)
    like49 = Like(user_id=5, post_id=17)
    like50 = Like(user_id=4, post_id=1)
    like51 = Like(user_id=5, post_id=3)
    like52 = Like(user_id=3, post_id=2)
    like53 = Like(user_id=2, post_id=19)
    like54 = Like(user_id=1, post_id=15)
    like55 = Like(user_id=2, post_id=14)

    all_likes = [like1, like2, like3, like4, like5, like6, like7, like8, like9, like10, like11, like12, like13, like14, like15, like16, like17, like18, like19, like20, like21, like22, like23, like24, like25, like26, like27, like28, like29, like30, like31, like32, like33, like34, like35, like36, like37, like38, like39, like40, like41, like42, like43, like44, like45, like46, like47, like48, like49, like50, like51, like52, like53, like54, like55]
    add_likes = [db.session.add(like) for like in all_likes]
    db.session.commit()
    return all_likes


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
