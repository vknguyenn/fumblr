import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadPostsThunk } from '../../redux/post'
import { loadUsersThunk } from '../../redux/user'
import OpenModalButton from  "../OpenModalButton/OpenModalButton"
import CreatePost from '../CreatePost/CreatePost'



const HomePage = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.post)
    const postObj = Object.values(posts);
    const user = useSelector(state => state.user);

    // const sessionUser = useSelector((state) => state.session.user);
    console.log("POSTS: ", posts)
    console.log("POSTS OBJ: ", postObj)
    console.log("user: ", user)
  
    
    useEffect(() => {
        dispatch(loadPostsThunk());
        dispatch(loadUsersThunk())
    }, [dispatch])

    if (!posts || postObj.length === 0) {
        return <div>Loading posts...</div>;
    }

    return (
        <>
        <div className='create-button'>
            <OpenModalButton buttonText="Create a Post" modalComponent={ <CreatePost /> } />
        </div>
         {postObj.map((post) => {
                const postUser = user[post.user_id]; 
                return (
                    <div key={post.id}>
                        <h3>{postUser?.username}</h3>
                        <h4>{post?.post_title}</h4>
                        <img src={post?.image_url} />
                        <p>{post?.text}</p>
                    </div>
                );
            })}
        </>
    )
}

export default HomePage