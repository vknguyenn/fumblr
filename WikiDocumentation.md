# Wiki Documentation

## MVP Feature List

### Posts
- Users should be able to view all posts.
- Users should be able to create posts.
- Users should be able to update their posts.
- Users should be able to delete their posts.
### Comments
- Users should be able to view all comments on a post.
- Users should be able to create a comment on a post.
- Users should be able to update their comment on a post.
- Users should be able to delete their comment from a post.

### Likes*
- Users should be able to view the likes on a post.
- Users should be able to like a post.
- Users should be able to unlike a post.
### Follows*
- Users should be able to view who they follow.
- Users should be able to follow another user.
- Users should be able to unfollow another user.

## Database Schema (two main features for now)
![Alt text](schema.png)

# User Stories

### Posts
Create Posts
- As a logged in user, I want to be able to post new Posts.
- When I'm on the /new-post page:
I can write and submit a new Post.
So that I can share my thoughts and memes with my friends.
Viewing Posts
- As a logged in or logged out user, I want to be able to view a selection of the most recent Posts.
- When I'm on the /posts page:
I can view the ten most recently posted Posts.
So that I can read and interact with the thoughts and memes of my friends.
As a logged in or logged out user, I want to be able to view a specific Post and its associated comments and likes.
- When I'm on the /posts/:id page:
I can view the content of the posts, as well as the associated comments and likes.
So that I can read and interact with the thoughts and memes of my friends, and add my own thoughts and memes in the comments.

Updating Posts
- As a logged in user, I want to be able to edit my Posts by clicking an Edit button associated with the Post anywhere that Post appears.
When I'm on the /posts, /posts/:id, or /users/:id/posts pages:
I can click "Edit" to make permanent changes to Posts I have posted.
So that I can fix any errors I make in my Posts.

Deleting Posts
- As a logged in user, I want to be able to delete my Posts by clicking a Delete button associated with the Post anywhere that Post appears.
When I'm on the /Posts, /Posts/:id, or /users/:id/Posts pages:
I can click "Delete" to permanently delete a Post I have posted.
So that when I realize I shouldn't have publicly said something, I can easily remove it.
### Comments
Create Comments
- As a logged in user, I want to be able to post new comments.
When I'm on the /posts page:
I should be able to click on the "create comment" button.
I can write and submit a new comment on a Post.
So that I can share my comments with my friends about that Post.

Viewing Comments
- As a logged in or logged out user, I want to be able to view a selection of the most recent comments on a Post.
- When I'm on the /posts page:
I can view the ten most recently posted comments.
So that I can read and interact with the thoughts and memes of my friends.

Updating Comments
- As a logged in user, I want to be able to edit my comments by clicking an Edit button associated with the Post.
When I'm on the /posts/:id, or /users/:id/posts pages:
I can click "Edit" to make permanent changes to comments that I have posted.
So that I can fix any errors I make in my comments.

Deleting Comments
- As a logged in user, I want to be able to delete my comments by clicking a Delete button associated with the Post.
When I'm on the /posts/:id, or /users/:id/posts pages:
I can click "X" to permanently delete a comment I have posted.

# Wireframes 

![Alt text](image.png)

![Alt text](image-1.png)

![Alt text](image-2.png)