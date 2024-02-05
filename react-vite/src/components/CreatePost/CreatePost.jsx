import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../redux/post';
import { useModal } from '../../context/Modal';

export default function CreatePost() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const { closeModal } = useModal()
 
    // const user = useSelector(state => state.session.user)
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    console.log(errors, submitted)
    
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
    // encType='multipart/form-data'
    return (
        <form id='post-modal' encType='multipart/form-data' onSubmit={handleSubmit}>
            <div className='modal-container'>
                <h2>Create a Post</h2>
                <div className='post-form-labels'>
                    <label>Title</label>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='post-form-labels'>
                    <label>Image</label>
                    <input type='file' accept='image/*' onChange={e => setImage(e.target.files[0])} />
                </div>
                <div className='post-form-labels'>
                    <label>Text</label>
                    <textarea type='text' value={text} onChange={e => setText(e.target.value)} />
                </div>
                <div className='post-submit'>
                    <button className='post-button' type='submit'>Create Post</button>
                </div>
                {(imageLoading) && <p className="loading-text">Loading...</p>}
            </div>
        </form>
    )

}