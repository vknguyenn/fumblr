import { useDispatch } from "react-redux"
import { useState } from "react"
import { createCommentThunk, loadCommentsThunk } from "../../redux/comment"
import { useModal } from "../../context/Modal"


const AddComment = ({ postId }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!comment) {
            newErrors.comment = 'Comment cannot be empty.';
            setErrors(newErrors);
            return;
        }

        await dispatch(createCommentThunk({comment}, postId));
        await dispatch(loadCommentsThunk())
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='modal-container'>
                <h2>Add a Comment</h2>
                {errors.comment && <p className="error-text">{errors.comment}</p>}
                <div className='comment-form-group'>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                    />
                </div>
                <div className='comment-submit'>
                    <button type='submit'>Add Comment</button>
                </div>
            </div>
        </form>
    );
}

export default AddComment