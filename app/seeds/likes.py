from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    like1 = Like(
        userId = 1,
        postId = 2
    )
    like2 = Like(
        userId = 2,
        postId = 3
    )
    like3 = Like(
        userId = 3,
        postId = 1
    )

    like4 = Like(userId=1, postId=6)
    like5 = Like(userId=1, postId=8)
    like6 = Like(userId=2, postId=10)
    like7 = Like(userId=2, postId=17)
    like8 = Like(userId=3, postId=13)
    like9 = Like(userId=3, postId=19)
    like10 = Like(userId=4, postId=4)
    like11 = Like(userId=4, postId=7)
    like12 = Like(userId=4, postId=9)

    likes = [like1, like2, like3, like4, like5, like6, like7, like8, like9, like10,
             like11, like12]

    for like in likes:
        db.session.add(like)

    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        
    db.session.commit()