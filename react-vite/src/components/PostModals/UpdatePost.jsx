import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updatePostThunk, loadPostsThunk } from "../../redux/post";
import { useModal } from "../../context/Modal";


const UpdatePost = ({ post }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(post.post_title)
    const [text, setText] = useState(post.text)
    const [image, setImage] = useState(post?.image_url)
    const [imageLoading, setImageLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    console.log(errors, submitted)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        if (text && title) {
            const formData = new FormData();
    
            formData.append('post_title', title)
            formData.append('text', text)
            formData.append('image', image)
            
            setImageLoading(true);
            await dispatch(updatePostThunk(formData, post.id))
            await dispatch(loadPostsThunk())
            closeModal()
        }
    }

    useEffect(() => {
        const newErrors = {}
        if (!title) {
            newErrors.title = 'Title is required'
        } 
        if (!text) {
            newErrors.text = 'Text is required'
        } 
            
        setErrors(newErrors)
    }, [title, text]);

    


    return (
        <form id='post-modal' encType='multipart/form-data' onSubmit={handleSubmit}>
            <div className='modal-container'>
                <h2>Update a Post</h2>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Title:</label>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
                    {submitted && errors.title && <p className='form-errors' style={{color: '#6F52FF'}}>{errors.title}</p>}
                </div>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Image (optional):</label>
                    <input type='file' accept='image/*' onChange={e => setImage(e.target.files[0])} />
                </div>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Text: </label>
                    <textarea type='text' value={text} onChange={e => setText(e.target.value)} />
                    {submitted && errors.text && <p className='form-errors' style={{color: '#6F52FF'}}>{errors.text}</p>}
                </div>
                <div className='post-submit'>
                    <button className='post-button' type='submit'>Update Post</button>
                </div>
                {(imageLoading) && <p className="loading-text">Loading...</p>}
            </div>
        </form>
    )
    
}


export default UpdatePost