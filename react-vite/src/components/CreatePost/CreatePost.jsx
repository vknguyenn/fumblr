import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../redux/post';
import { useModal } from '../../context/Modal';
import './CreatePost.css'

export default function CreatePost() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const { closeModal } = useModal()

    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    // console.log(errors, submitted)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)

        if (Object.keys(errors).length > 0) {

            console.error("Cannot submit due to errors:", errors);
            return;
        }
        
        if (text.length > 0 && title.length > 0) {
            const formData = new FormData();
            formData.append('post_title', title)
            formData.append('text', text)
            if (image && typeof image === 'object') {
                formData.append('image', image);
            }
           
               setImageLoading(true);
            await dispatch(createPostThunk(formData))
            closeModal();
        }
    }
    useEffect(() => {
        const newErrors = {}
        if (!title.length) {
            newErrors.title = 'Title is required'
        } 
        if (title.length > 55) {
            newErrors.title = 'Title cannot exceed 55 characters'
        } 
        if (text.length > 1000) {
            newErrors.text = 'Text cannot exceed 1000 characters'
        } 
        if (!text.length) {
            newErrors.text = 'Text is required'
        }
        if (image && typeof image === 'object' && image.name) {
            if (!image.name.endsWith('.jpeg') && !image.name.endsWith('.jpg') && !image.name.endsWith('.png') && !image.name.endsWith('.gif')) {
                newErrors.image = 'Image must be in .jpeg, .jpg, .png, or .gif format';
            }
        }
            
        setErrors(newErrors)
    }, [title, text, image]);
 
    return (
        <form id='post-modal' encType='multipart/form-data' onSubmit={handleSubmit}>
            <div className='modal-container'>
                <h2 className='create-post-title'>Create a Post</h2>
                <div className='post-inputs'>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Title:</label>
                    <input type='text' placeholder='Post Title' value={title} onChange={e => setTitle(e.target.value)} />
                    {submitted && errors.title && <p className='form-errors'style={{color: '#f864ec'}}>{errors.title}</p>}
                </div>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Image (optional):</label>
                    <input className='image-button' type='file' accept='image/*' onChange={e => setImage(e.target.files[0])} />
                    {submitted && errors.image && <p className='form-errors'style={{color: '#f864ec'}}>{errors.image}</p>}
                </div>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Text:</label>
                    <textarea className='caption-box' type='text' placeholder='Add caption here...' value={text} onChange={e => setText(e.target.value)} />
                    {submitted && errors.text && <p className='form-errors' style={{color: '#f864ec'}}>{errors.text}</p>}
                </div>
                </div>
                <div className='post-submit'>
                    <button className='post-button' type='submit'>Create Post</button>
                </div>
                {(imageLoading) && <p className="loading-text">Loading...</p>}
            </div>
        </form>
    )

}