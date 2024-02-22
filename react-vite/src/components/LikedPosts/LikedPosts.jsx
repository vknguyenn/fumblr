import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as postActions from '../../redux/post';
import * as likeActions from '../../redux/like';
import { loadUsersThunk } from '../../redux/user';
import { loadCommentsThunk } from '../../redux/comment'
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdatePost from '../PostModals/UpdatePost';
import DeletePost from '../PostModals/DeletePost';
import AddComment from '../Comments/AddComments'
import UpdateComment from '../Comments/UpdateComment'
import DeleteComment from '../Comments/DeleteComment'
import Like from '../Likes/Likes';

const LikedPosts = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const currentUser = useSelector(state => state.session.user);
    const likes = useSelector(state => state.like.likes ?? []);
    const likedPostsIds = likes.filter(like => like.userId === currentUser?.id).map(like => like.postId);
    const comments = useSelector(state => state.comment.comment || [])

    
    const posts = useSelector((state) => state.post)
    const postObj = Object.values(posts).filter(post => likedPostsIds.includes(post.id))

    useEffect(() => {
        dispatch(loadUsersThunk());
        dispatch(likeActions.loadLikesThunk());
        dispatch(postActions.loadPostsThunk());
        dispatch(loadCommentsThunk())
    }, [dispatch]);
    
    if (!postObj.length) return <p>You have not liked a post yet!</p>

    return (
        <>
        <div id='homepage-content'>
        <h1>Your Likes</h1>
        {currentUser && (
            <div className="posts">
            <div className='posts-container'>
            {postObj.map((post) => {
                const postUser = user[post.user_id]; 
                const postComments = Object.values(comments).filter(comment => comment.postId === post.id);
                return (
                    <div  key={post.id} className='post-card'> 
                       <div key={post.id}>
                           <h3>{postUser?.username}</h3>
                           <h4>{post?.post_title}</h4>
                           {post.image_url ? (
                               <img
                               className='post-image'
                               src={post.image_url}
                               alt="Post"
                               style={{ border: '1px solid #8971ff', width: '500px' }}
                               />
                               ) : (
                                   <div style={{ width: '500px', height: '0px' }}></div>
                                   )}
                       <div className='post-buttons'> 
                           <p className='post-caption'>{post?.text}</p>
                {currentUser && currentUser.id === postUser?.id && (
                    <>
                    <div className='post-edit-del'>
                       <OpenModalButton className='post-icons' buttonText={<div className="edit-delete"><i className="fa-regular fa-pen-to-square"></i></div>} modalComponent={<UpdatePost post={post} />} />
                       <OpenModalButton className='post-icons' buttonText={<div className="edit-delete"><i className="fa-solid fa-trash"></i></div>} modalComponent={<DeletePost post={post} />} />
                    </div>
                   </>
                   )}
                   </div>
                   <div className="comments-section">
                   {postComments.length > 0 && <h4>Comments:</h4>}
                   {postComments.map(com => (
                       <div className="posted-comment" key={com.id}>
                           <p className='added-comment'><strong>{com.username}:</strong> {com.comment}</p>
                           {currentUser && currentUser.id === com.userId && (
                               <>
                               <div className='comment-icons'>
   
                                           <OpenModalButton
                                               buttonText={<div className="edit-delete-div"><i className="fa-regular fa-pen-to-square"></i></div>}
                                               modalComponent={<UpdateComment comment={com} />}
                                               />
                                           <OpenModalButton
                                               buttonText={<div className="edit-delete-div"><i className="fa-solid fa-trash"></i></div>}
                                               modalComponent={<DeleteComment commentId={com.id} />}
                                               />
                                               </div>
                                               </>
                                       )}                      
                       </div>
                   ))}
                   </div>
                   {currentUser && (
                       <>
                       <div className='add-comment-button'>
                           <OpenModalButton
                               buttonText="Add Comment"
                               modalComponent={<AddComment postId={post.id} />}
                               />
                            <Like postId={post?.id} userId={postUser?.id} />
                            </div>
                               </>
                       )}
               </div>
                   </div>
                       
                       );
                    })}
           </div>
                   
            </div>
        )}
        </div>
        </>
    );
};

export default LikedPosts;
