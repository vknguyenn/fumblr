import { useModal } from "../../context/Modal";
import { deleteCommentThunk, loadCommentsThunk } from "../../redux/comment";
import { useDispatch } from "react-redux";

const DeleteComment = ({commentId}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleDelete = async(e) => {
        e.preventDefault()
        console.log("COMMENT ID: ", commentId)
        await dispatch(deleteCommentThunk(commentId))
        await dispatch(loadCommentsThunk())
        closeModal()

    }
    return (
        <div className="delete-post-modal">
            <p>Do you want to delete this comment?</p>
            <button onClick={handleDelete}>Yes, delete</button>
            <button onClick={closeModal}>No</button>
        </div>
    )
}

export default DeleteComment