import { useDispatch } from "react-redux"
import { useState } from "react"
import { createCommentThunk, loadCommentsThunk } from "../../redux/comment"
import { useModal } from "../../context/Modal"
import './AddComment.css'


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

        if (comment.length > 255) {
            newErrors.comment = 'Comment must be under 255 characters'
            setErrors(newErrors);
            return;
        }

        await dispatch(createCommentThunk({comment}, postId));
        await dispatch(loadCommentsThunk())
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='modal-comment'>
                <h2>Add a Comment</h2>
                {errors.comment && <p className="form-errors" style={{color: '#6F52FF'}}>{errors.comment}</p>}
                <div className='comment-form-group'>
                    <textarea
                        className="comment-box"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                    />
                </div>
                <div className='comment-submit'>
                    <button className='add-comment-submit' type='submit'>Add Comment</button>
                </div>
            </div>
        </form>
    );
}

export default AddComment