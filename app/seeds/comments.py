from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        user_id = 1,
        post_id = 2,
        comment='omg i totally feel that'
    )
    comment2 = Comment(
        user_id = 2,
        post_id = 3,
        comment='nah, five guys is so mid AND expensive.'
    )
    comment3 = Comment(
        user_id = 3,
        post_id = 1,
        comment='i cant wait! im so happy for you!!'
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()