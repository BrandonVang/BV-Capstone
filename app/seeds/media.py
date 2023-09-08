from app.models import db, Media, Post, environment, SCHEMA
from sqlalchemy.sql import text


def seed_medias():
    media1 = Media(post_id=1, media_type='image', media_url='https://mymodernmet.com/wp/wp-content/uploads/2020/10/cooper-baby-corgi-dogs-8.jpg')
    media2 = Media(post_id=2, media_type='image', media_url='https://i.pinimg.com/1200x/47/bc/60/47bc605880965bfa92d7c97b346aedde.jpg')
    media3 = Media(post_id=4, media_type='image', media_url='https://www.rover.com/blog/wp-content/uploads/2019/01/6342530545_45ec8696c8_b.jpg')
    media4 = Media(post_id=8, media_type='image', media_url='https://images.gog-statics.com/da2b2d57e2b8654397043377654b1aa3ce6c11a03435c9afa28325e4f0fcc610_product_card_v2_mobile_slider_639.jpg')
    media5 = Media(post_id=9, media_type='image', media_url='https://www.siliconera.com/wp-content/uploads/2022/02/Elden-Ring-Review.jpg')
    media6 = Media(post_id=11, media_type='image', media_url='https://blz-contentstack-images.akamaized.net/v3/assets/blt77f4425de611b362/blt6d7b0fd8453e72b9/646e720a71d9db111a265e8c/d4-open-graph_001.jpg')
    media7 = Media(post_id=12, media_type='image', media_url='https://www.denofgeek.com/wp-content/uploads/2022/11/God-of-War-Ragnarok-Sequel.jpg')
    media8 = Media(post_id=14, media_type='image', media_url='https://www.dsogaming.com/wp-content/uploads/2022/02/Dying-Light-2-new-feature.jpg')
    media9 = Media(post_id=15, media_type='image', media_url='https://assets-prd.ignimgs.com/2021/08/05/final-fantasy-xvi-button-1628180674117.jpg')



    db.session.add(media1)
    db.session.add(media2)
    db.session.add(media3)
    db.session.add(media4)
    db.session.add(media5)
    db.session.add(media6)
    db.session.add(media7)
    db.session.add(media8)
    db.session.add(media9)

    db.session.commit()

def undo_medias():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.medias RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM medias"))
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
