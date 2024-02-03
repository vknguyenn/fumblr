import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadPostsThunk } from '../../redux/post'
import { loadUsersThunk } from '../../redux/user'
import OpenModalButton from  "../OpenModalButton/OpenModalButton"
import CreatePost from '../CreatePost/CreatePost'
import UpdatePost from '../PostModals/UpdatePost'
import DeletePost from '../PostModals/DeletePost'



const HomePage = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.post)
    const postObj = Object.values(posts).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const user = useSelector(state => state.user);
    const currentUser = useSelector(state => state.session.user);
    
    useEffect(() => {
        dispatch(loadPostsThunk());
        dispatch(loadUsersThunk())
    }, [dispatch])

    if (!posts || postObj.length === 0) {
        return <div>Loading posts...</div>;
    }

    return (
        <>
        {currentUser && (
        <div className='create-button'>
            <OpenModalButton buttonText="Create a Post" modalComponent={ <CreatePost /> } />
        </div>
        )}
        <div>
         {postObj.map((post) => {
                const postUser = user[post.user_id]; 
                return (
                    <div key={post.id}>
                        <h3>{postUser?.username}</h3>
                        <h4>{post?.post_title}</h4>
                        <img src={post?.image_url} />
                        <p>{post?.text}</p>
                {currentUser && currentUser.id === postUser?.id && (
                        <OpenModalButton
                        buttonText={"Edit Post"}
                        modalComponent={<UpdatePost post={post} />}
                        />
                )}
                {currentUser && currentUser.id === postUser?.id && (
                        <OpenModalButton
                        buttonText={"Delete Post"}
                        modalComponent={<DeletePost post={post} />}
                        />
                )}
                    </div>
                );
            })}
        </div>
        
        </>
    )
}

export default HomePage