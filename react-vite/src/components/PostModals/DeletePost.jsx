import { useModal } from "../../context/Modal";
import { deletePostThunk, loadPostsThunk } from "../../redux/post";
import { clearComments, loadCommentsThunk } from "../../redux/comment";
import { useDispatch } from "react-redux";
import './DeletePost.css'


const DeletePost = ({post}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deletePostThunk(post.id))
        await dispatch(loadPostsThunk())
        dispatch(clearComments(post.id))
        await dispatch(loadCommentsThunk())
        closeModal()
    }
    return (
        <div className="delete-post-modal">
            <h3>Do you want to delete this post?</h3>
            <div className="delete-modal-buttons">
            <button className="delete-buttons" onClick={handleDelete}>Yes, delete</button>
            <button className="delete-buttons" onClick={closeModal}>No</button>
            </div>
        </div>
    )

}

export default DeletePost