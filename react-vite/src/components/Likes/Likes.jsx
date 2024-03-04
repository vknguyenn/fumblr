import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as likeActions from "../../redux/like";
import "./Likes.css"

const Like = ({ postId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const likes = useSelector(state => state.like.likes ?? []);
    
    const initiallyLiked = likes.some(like => like.postId === postId && like.userId === currentUser?.id);

    const [liked, setLiked] = useState(initiallyLiked);


    const likedId = likes.find(like => like.postId === postId && like.userId === currentUser?.id)?.id;

    useEffect(() => {
        setLiked(initiallyLiked);
    }, [likes, postId, currentUser, initiallyLiked]);

    const likePost = async () => {
        await dispatch(likeActions.createLikeThunk(postId));
        setLiked(true);
    };

    const unlikePost = async () => {
        await dispatch(likeActions.removeLikeThunk(likedId));
        setLiked(false); 
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
