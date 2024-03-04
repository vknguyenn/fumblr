import { useDispatch } from "react-redux";
import { useState } from "react"
import { updateCommentThunk, loadCommentsThunk } from "../../redux/comment";
import { useModal } from "../../context/Modal";


const UpdateComment = ({comment} ) => {
    const dispatch = useDispatch()
    const [commentText, setCommentText] = useState(comment.comment)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const { closeModal } = useModal()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setSubmitted(true)

        const newErrors = {};
        if (!commentText) {
            newErrors.comment = 'Comment cannot be empty.';
            setErrors(newErrors);
            return;
        }

        if (commentText.length > 255) {
            newErrors.comment = 'Comment must be under 255 characters'
            setErrors(newErrors);
            return;
        }

        await dispatch(updateCommentThunk({ comment: commentText }, comment.id));
        await dispatch(loadCommentsThunk())
        closeModal();
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='modal-comment'>
                <h2>Edit a Comment</h2>
                {submitted && errors.comment && <p className="form-errors" style={{color: '#f864ec'}}>{errors.comment}</p>}
                <div className='comment-form-group'>
                    <textarea
                        className="comment-box"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write your comment here..."
                    />
                </div>
                <div className='comment-submit'>
                    <button className='add-comment-submit' type='submit'>Edit Comment</button>
                </div>
            </div>
        </form>
    );

}

export default UpdateComment;