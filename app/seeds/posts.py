from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    post1 = Post(
        user_id = 1,
        post_title = 'At the finish line :D',
        image_url = 'https://i.pinimg.com/550x/f6/ed/b8/f6edb83a561d8440d7303e05cf3f056f.jpg',
        text='OMG WE ARE ALMOST DONE GUYS!!!'
    )
    post2 = Post(
        user_id = 2,
        post_title = 'Mood for the day',
        image_url = 'https://i.pinimg.com/736x/65/dd/d4/65ddd4b8881cd50c9e0af5b12eebb4e5.jpg',
        text='All I want to do is rot in bed all day, is that too much to ask?'
    )
    post3 = Post(
        user_id = 3,
        post_title = 'Five Guys on top',
        image_url='https://pbs.twimg.com/media/E_RITIgWYAI0OwH.jpg',
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
    