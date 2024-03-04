import { useModal } from "../../context/Modal";
import { deleteCommentThunk, loadCommentsThunk } from "../../redux/comment";
import { useDispatch } from "react-redux";

const DeleteComment = ({commentId}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleDelete = async(e) => {
        e.preventDefault()

        await dispatch(deleteCommentThunk(commentId))
        await dispatch(loadCommentsThunk())
        closeModal()

    }
    return (
        <div className="delete-post-modal">
            <h3>Do you want to delete this comment?</h3>
            <div className="delete-modal-buttons">
            <button className="delete-buttons" onClick={handleDelete}>Yes, delete</button>
            <button className="delete-buttons" onClick={closeModal}>No</button>
            </div>
        </div>
    )
}

export default DeleteComment