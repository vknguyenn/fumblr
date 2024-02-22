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
    comment4 = Comment(user_id=2, post_id=4, comment="It's always good to look back and reflect.")
    comment5 = Comment(user_id=3, post_id=5, comment="Tech trends are fascinating, always something new.")
    comment6 = Comment(user_id=1, post_id=6, comment="Weekends are for relaxing, enjoy!")
    comment7 = Comment(user_id=4, post_id=7, comment="I could use some good book recommendations too.")
    comment8 = Comment(user_id=1, post_id=8, comment="Horror movies are the best, have fun!")
    comment9 = Comment(user_id=2, post_id=9, comment="Good luck with your fitness journey!")
    comment10 = Comment(user_id=3, post_id=10, comment="Welcome to the community!")
    comment11 = Comment(user_id=1, post_id=11, comment="Jazz really sets a great work atmosphere.")
    comment12 = Comment(user_id=2, post_id=12, comment="Nature is the best therapy.")
    comment13 = Comment(user_id=3, post_id=13, comment="DIY projects can be so rewarding.")
    comment14 = Comment(user_id=1, post_id=14, comment="Coding is challenging but indeed rewarding.")
    comment15 = Comment(user_id=4, post_id=15, comment="Tough choice, but pizza always wins for me.")
    comment16 = Comment(user_id=3, post_id=16, comment="Japan is beautiful, hope you make it there.")
    comment17 = Comment(user_id=2, post_id=17, comment="Pets bring so much joy into our lives!")
    comment18 = Comment(user_id=1, post_id=18, comment="Game nights are the best, enjoy!")
    comment19 = Comment(user_id=4, post_id=19, comment="Self-care is crucial, especially these days.")
    comment20 = Comment(user_id=1, post_id=20, comment="Study hacks are always appreciated, thanks for sharing!")

    comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10,
                comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20]

    for comment in comments:
        db.session.add(comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()