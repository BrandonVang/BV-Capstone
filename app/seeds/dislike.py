from app.models import db, Dislike, environment, SCHEMA
from sqlalchemy.sql import text

def seed_dislikes():
    dislike1 = Dislike(user_id=6, post_id=1)
    dislike2 = Dislike(user_id=7, post_id=1)
    dislike3 = Dislike(user_id=8, post_id=1)
    dislike4 = Dislike(user_id=9, post_id=3)
    dislike5 = Dislike(user_id=10, post_id=3)
    dislike6 = Dislike(user_id=6, post_id=4)
    dislike7 = Dislike(user_id=7, post_id=5)
    dislike8 = Dislike(user_id=8, post_id=2)
    dislike9 = Dislike(user_id=9, post_id=2)
    dislike10 = Dislike(user_id=10, post_id=2)
    dislike11 = Dislike(user_id=6, post_id=3)
    dislike12 = Dislike(user_id=7, post_id=4)
    dislike13 = Dislike(user_id=8, post_id=5)
    dislike14 = Dislike(user_id=9, post_id=6)
    dislike15 = Dislike(user_id=10, post_id=6)
    dislike16 = Dislike(user_id=6, post_id=7)
    dislike17 = Dislike(user_id=7, post_id=8)
    dislike18 = Dislike(user_id=8, post_id=9)
    dislike19 = Dislike(user_id=9, post_id=10)
    dislike20 = Dislike(user_id=10, post_id=10)
    dislike21 = Dislike(user_id=6, post_id=11)
    dislike22 = Dislike(user_id=7, post_id=12)
    dislike23 = Dislike(user_id=8, post_id=13)
    dislike24 = Dislike(user_id=9, post_id=14)
    dislike25 = Dislike(user_id=10, post_id=15)
    dislike26 = Dislike(user_id=6, post_id=16)
    dislike27 = Dislike(user_id=7, post_id=17)
    dislike28 = Dislike(user_id=8, post_id=18)
    dislike29 = Dislike(user_id=9, post_id=19)
    dislike30 = Dislike(user_id=10, post_id=20)
    dislike31 = Dislike(user_id=6, post_id=20)
    dislike32 = Dislike(user_id=7, post_id=20)
    dislike33 = Dislike(user_id=9, post_id=18)
    dislike34 = Dislike(user_id=9, post_id=17)
    dislike35 = Dislike(user_id=10, post_id=21)
    dislike36 = Dislike(user_id=6, post_id=21)
    dislike37 = Dislike(user_id=7, post_id=21)
    dislike38 = Dislike(user_id=8, post_id=20)
    dislike40 = Dislike(user_id=10, post_id=13)
    dislike41 = Dislike(user_id=6, post_id=12)
    dislike42 = Dislike(user_id=7, post_id=11)
    dislike43 = Dislike(user_id=8, post_id=10)
    dislike44 = Dislike(user_id=9, post_id=9)
    dislike45 = Dislike(user_id=10, post_id=16)
    dislike46 = Dislike(user_id=6, post_id=8)
    dislike48 = Dislike(user_id=8, post_id=4)
    dislike49 = Dislike(user_id=9, post_id=15)
    dislike50 = Dislike(user_id=10, post_id=1)
    dislike51 = Dislike(user_id=6, post_id=5)
    dislike52 = Dislike(user_id=7, post_id=2)
    dislike53 = Dislike(user_id=8, post_id=19)
    dislike54 = Dislike(user_id=9, post_id=11)
    dislike55 = Dislike(user_id=10, post_id=14)

    all_dislikes = [dislike1, dislike2, dislike3, dislike4, dislike5, dislike6, dislike7, dislike8, dislike9, dislike10, dislike11, dislike12, dislike13, dislike14, dislike15, dislike16, dislike17, dislike18, dislike19, dislike20, dislike21, dislike22, dislike23, dislike24, dislike25, dislike26, dislike27, dislike28, dislike29, dislike30, dislike31, dislike32, dislike33, dislike34, dislike35, dislike36, dislike37, dislike38, dislike40, dislike41, dislike42, dislike43, dislike44, dislike45, dislike46, dislike48, dislike49, dislike50, dislike51, dislike52, dislike53, dislike54, dislike55]
    add_dislikes = [db.session.add(dislike) for dislike in all_dislikes]
    db.session.commit()
    return all_dislikes


def undo_dislikes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dislikes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dislikes"))

    db.session.commit()
