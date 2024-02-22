import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadPostsThunk } from '../../redux/post'
import { loadUsersThunk } from '../../redux/user'
import UpdatePost from '../PostModals/UpdatePost'
import DeletePost from '../PostModals/DeletePost'
import CreatePost from '../CreatePost/CreatePost'
import OpenModalButton from  "../OpenModalButton/OpenModalButton"

const ManagePosts = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.post)
    const user = useSelector(state => state.user);
    const currentUser = useSelector(state => state.session.user);
    const postObj = Object.values(posts)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter(post => post.user_id === currentUser.id)

    useEffect(() => {
        dispatch(loadPostsThunk());
        dispatch(loadUsersThunk());
    }, [dispatch])

    // if (!posts || postObj.length === 0) {
    //     return <div>No posts yet</div>;
    // }

    return (
        <>
        <div id='homepage-content'>
        <h1>Manage Posts</h1>
        {currentUser && (
        <div className='create-button'>
            <OpenModalButton buttonText={<div className='create-post'><i className="fa-regular fa-square-plus"></i>Create a Post</div>} modalComponent={ <CreatePost /> } />
        </div>
        )}
        {currentUser && postObj.length === 0 && (
                    <div>You do not have a post yet, click the button above to create your first post!</div>
                )}
        <div>
        <div className='posts-container'>
         {postObj.map((post) => {
                const postUser = user[post.user_id]; 
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

export default ManagePosts