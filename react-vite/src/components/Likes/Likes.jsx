// import { useDispatch, useSelector } from "react-redux";
// import * as likeActions from "../../redux/like";
// import "./Likes.css"


// const Like = ({postId, userId}) => {
//     const dispatch = useDispatch();
//     const currentUser = useSelector(state => state.session.user);
//     const likes = useSelector(state => state.like.likes ?? []);
//     const likedPostsIds = likes.filter(like => like.userId === currentUser?.id).map(like => like.postId);

//     let liked = likedPostsIds.includes(postId);
//     let likedId = likes.find(like => like.postId === postId && like.userId === currentUser?.id)?.id;

//     const likePost = async (e) => {
//         e.preventDefault();
//         await dispatch(likeActions.createLikeThunk(postId))
//     }

//     const unlikePost = async (e) => {
//         e.preventDefault();
//         await dispatch(likeActions.removeLikeThunk(likedId))
//     }

//     return (
//         <div className="likes">
//            {userId && !liked && (
//                 <i onClick={e => likePost(e)} className="fa-regular fa-heart"></i>
//             )}
//             {userId && liked && (
//                 <i onClick={e => unlikePost(e)} className="fa-solid fa-heart"></i>
//             )}
//         </div>
//     )
// } 

// export default Like

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as likeActions from "../../redux/like";
import "./Likes.css"

const Like = ({ postId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const likes = useSelector(state => state.like.likes ?? []);
    
    // Determine if the post is initially liked
    const initiallyLiked = likes.some(like => like.postId === postId && like.userId === currentUser?.id);

    // Local state to manage liked status
    const [liked, setLiked] = useState(initiallyLiked);

    // Find the ID of the like for the current post and user
    const likedId = likes.find(like => like.postId === postId && like.userId === currentUser?.id)?.id;

    useEffect(() => {
        // This effect ensures the local state stays in sync with the Redux store
        setLiked(initiallyLiked);
    }, [likes, postId, currentUser, initiallyLiked]);

    const likePost = async () => {
        await dispatch(likeActions.createLikeThunk(postId));
        setLiked(true); // Optimistically set liked to true
    };

    const unlikePost = async () => {
        await dispatch(likeActions.removeLikeThunk(likedId));
        setLiked(false); // Optimistically set liked to false
    };

    return (
        <div className="likes">
            {!liked && (
                <i onClick={likePost} className="fa-regular fa-heart"></i>
            )}
            {liked && (
                <i onClick={unlikePost} className="fa-solid fa-heart"></i>
            )}
        </div>
    );
};

export default Like;
