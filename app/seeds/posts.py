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
    post4 = Post(user_id=1, post_title='Reflections', text='''Reflecting on this journey, it's amazing to see how far we've come. From the initial struggles to the triumphs, every step has taught us something valuable. It's not just about the destination but the growth and experiences along the way. Looking back, I'm filled with gratitude for the lessons learned and the memories made. What a journey it has been!''')
    post5 = Post(user_id=1, post_title='Tech Trends', text='''In the world of literature, there's always something new and exciting to discover. Whether it's a gripping thriller, a heartwarming romance, or a mind-bending science fiction novel, books have the power to transport us to different worlds. I'm on the lookout for book recommendations that will captivate and inspire. If you have any favorites or hidden gems, please share them!''')

    post6 = Post(user_id=2, post_title='Weekend Vibes', image_url='https://www.icegif.com/wp-content/uploads/2022/12/icegif-1659.gif', text='Finally, the weekend is here. Time to relax!')
    post7 = Post(user_id=2, post_title='Book Recommendations', text='''In the world of literature, there's always something new and exciting to discover. Whether it's a gripping thriller, a heartwarming romance, or a mind-bending science fiction novel, books have the power to transport us to different worlds. I'm on the lookout for book recommendations that will captivate and inspire. If you have any favorites or hidden gems, please share them!''')

    post8 = Post(user_id=3, post_title='Movie Night', image_url='https://www.icegif.com/wp-content/uploads/2023/12/icegif-454.gif', text='Comedy movie marathon tonight. Any suggestions?')
    post9 = Post(user_id=3, post_title='Workout Goals', text='''Embarking on a fitness journey is both exciting and challenging. Today marks the beginning of my commitment to a healthier lifestyle. From setting realistic goals to finding workouts that I enjoy, it's all about taking it one step at a time. The support and encouragement from friends and family make a world of difference. Here's to the first step towards achieving my fitness goals! Wish me luck!''')

    post10 = Post(user_id=4, post_title='First Post!', text='Excited to join this community!😁')
    post11 = Post(user_id=4, post_title='Music to Chill', image_url= 'https://static.wikia.nocookie.net/simpsons/images/d/de/The_Simpsons_3G02.png', text='Jazz playlists have been my go-to for working.')
    post12 = Post(user_id=4, post_title='Nature Walks', text='''There's something inherently therapeutic about being in nature. Taking a walk in the park, with the sun filtering through the leaves and the gentle rustle of the wind, can soothe the soul and clear the mind. It's moments like these that remind us of the simple joys in life. Nature, with its endless beauty and serenity, has a unique way of healing and rejuvenating us. Let's not forget to take a moment to appreciate the natural world around us.''')
    post13 = Post(user_id=4, post_title='DIY Projects', image_url='https://i.gifer.com/ZP9d.gif' ,text='Started working on some DIY home decor projects.')
    post14 = Post(user_id=4, post_title='Coding Journey', image_url='https://media.discordapp.net/attachments/433472365498728468/1201361919915860058/IMG_3809.webp?ex=65e539f9&is=65d2c4f9&hm=b992dfade57147bfd56edac9d0f004af0fdd1d3f6651b5e459ae208c2e6d1405&=&format=webp&width=675&height=676', text='Learning to code has been challenging but rewarding!')

    post15 = Post(user_id=1, post_title='Favorite Foods', image_url='https://img.buzzfeed.com/buzzfeed-static/static/2015-06/26/14/campaign_images/webdr15/times-squidward-and-this-krabby-patty-captured-th-2-10875-1435344640-13_dblbig.jpg', text='Can never decide between pizza or burgers!')
    post16 = Post(user_id=2, post_title='Travel Dreams', text='''Japan, with its rich culture, stunning landscapes, and technological marvels, has always been at the top of my travel wishlist. From the bustling streets of Tokyo to the serene beauty of Kyoto's temples, the contrast between the old and the new is fascinating. I dream of experiencing the cherry blossom season, exploring ancient castles, and indulging in the exquisite cuisine. Japan represents a journey of discovery, and I hope to make that dream a reality one day.''')
    post17 = Post(user_id=3, post_title='Pet Love', image_url='https://www.icegif.com/wp-content/uploads/cat-icegif-19.gif', text='Adopted a kitten this weekend. She’s adorable!')
    post18 = Post(user_id=4, post_title='Game Night', image_url='https://media1.tenor.com/m/kQl8ORkHyV0AAAAC/simpsons-games.gif', text='Board games with friends is always a blast.')
    post19 = Post(user_id=2, post_title='Self Care', text='''In our fast-paced world, taking time for self-care is more important than ever. It's easy to get caught up in the hustle and forget to pause and take a breath. Self-care can take many forms, from reading a book and taking a long bath to practicing mindfulness and spending time in nature. It's about finding what rejuvenates you and making time for it. Remember, taking care of yourself isn't selfish; it's necessary for your well-being.''')
    post20 = Post(user_id=3, post_title='Study Tips', image_url='https://i.gifer.com/Ye3z.gif', text='Found some great study hacks for exams!')

    posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, 
             post11, post12, post13, post14, post15, post16, post17, post18, post19, post20]
    
    for post in posts:
        db.session.add(post)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()
    