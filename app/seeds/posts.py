from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    post1 = Post(
        user_id = 1,
        text='OMG WE ARE ALMOST DONE GUYS!!!'
    )
    post2 = Post(
        user_id = 2,
        text='All I want to do is rot in bed all day, is that too much to ask?'
    )
    post3 = Post(
        user_id = 3,
        text='I got Five Guys for the first time the other day and I totally get the hype now 🤤🍔🍟'
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
    