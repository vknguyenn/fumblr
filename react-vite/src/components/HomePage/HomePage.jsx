import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadPostsThunk } from '../../redux/post'
import { loadUsersThunk } from '../../redux/user'
import { loadCommentsThunk } from '../../redux/comment'
import OpenModalButton from  "../OpenModalButton/OpenModalButton"
import CreatePost from '../CreatePost/CreatePost'
import UpdatePost from '../PostModals/UpdatePost'
import DeletePost from '../PostModals/DeletePost'
import AddComment from '../Comments/AddComments'
import UpdateComment from '../Comments/UpdateComment'
import DeleteComment from '../Comments/DeleteComment'
import './HomePage.css'



const HomePage = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.post)
    const postObj = Object.values(posts).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const user = useSelector(state => state.user);
    const currentUser = useSelector(state => state.session.user);
    const comments = useSelector(state => state.comment.comment || [])
    
    useEffect(() => {
        dispatch(loadPostsThunk());
        dispatch(loadUsersThunk());
        dispatch(loadCommentsThunk());
    }, [dispatch])

    if (!posts || postObj.length === 0) {
        return <div>Loading posts...</div>;
    }

    return (
        <>
        <div id='homepage-content'>
        {currentUser && (
        <div className='create-button'>
            <OpenModalButton buttonText={<div className='create-post'><i className="fa-regular fa-square-plus"></i>Create a Post</div>} modalComponent={ <CreatePost /> } />
        </div>
        )}
        <div>
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
                        <p>{post?.text}</p>
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
                        <p><strong>{com.username}:</strong> {com.comment}</p>
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
                    <div className='add-comment-button'>
                        <OpenModalButton
                            buttonText="Add Comment"
                            modalComponent={<AddComment postId={post.id} />}
                        />
                         </div>
                    )}
            </div>
                </div>
                    
                );
            })}
        </div>
            
        </div>
        </div>
        
        </>
    )
}

export default HomePage


