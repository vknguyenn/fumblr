# from app.models import db, Image, environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_images():
#     image1 = Image(
#         post_id = 1,
#         image_url='https://i.pinimg.com/550x/f6/ed/b8/f6edb83a561d8440d7303e05cf3f056f.jpg'
#     )
#     image2 = Image(
#         post_id = 2,
#         image_url='https://i.pinimg.com/736x/65/dd/d4/65ddd4b8881cd50c9e0af5b12eebb4e5.jpg'
#     )
#     image3 = Image(
#         post_id = 3,
#         image_url='https://pbs.twimg.com/media/E_RITIgWYAI0OwH.jpg'
#     )

#     db.session.add(image1)
#     db.session.add(image2)
#     db.session.add(image3)
#     db.session.commit()

# def undo_images():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM users"))
        
#     db.session.commit()