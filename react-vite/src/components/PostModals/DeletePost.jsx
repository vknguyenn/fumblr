import { useModal } from "../../context/Modal";
import { deletePostThunk, loadPostsThunk } from "../../redux/post";
import { useDispatch} from "react-redux";


const DeletePost = ({post}) => {
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deletePostThunk(post.id))
        await dispatch(loadPostsThunk())
        closeModal()
    }
    return (
        <div className="delete-post-modal">
            <p>Do you want to delete this post?</p>
            <button onClick={handleDelete}>Yes, delete</button>
            <button onClick={closeModal}>No</button>
        </div>
    )

}

export default DeletePost