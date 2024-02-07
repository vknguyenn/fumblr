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
        
        if (text.length > 0 && title.length > 0) {
            const formData = new FormData();
            formData.append('post_title', title)
            formData.append('text', text)
            formData.append('image', image)
           
               setImageLoading(true);
            await dispatch(createPostThunk(formData))
            // await dispatch(loadPostsThunk())
            closeModal();
        }
    }
    useEffect(() => {
        const newErrors = {}
        if (!title.length) {
            newErrors.title = 'Title is required'
        } 
        if (!text.length) {
            newErrors.text = 'Text is required'
        } 
            
        setErrors(newErrors)
    }, [title, text]);
 
    return (
        <form id='post-modal' encType='multipart/form-data' onSubmit={handleSubmit}>
            <div className='modal-container'>
                <h2 className='create-post-title'>Create a Post</h2>
                <div className='post-inputs'>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Title:</label>
                    <input type='text' placeholder='Post Title' value={title} onChange={e => setTitle(e.target.value)} />
                    {submitted && errors.title && <p className='form-errors'style={{color: '#6F52FF'}}>{errors.title}</p>}
                </div>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Image (optional):</label>
                    <input className='image-button' type='file' accept='image/*' onChange={e => setImage(e.target.files[0])} />
                </div>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Text:</label>
                    <textarea type='text' placeholder='Add caption here...' value={text} onChange={e => setText(e.target.value)} />
                    {submitted && errors.text && <p className='form-errors' style={{color: '#6F52FF'}}>{errors.text}</p>}
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