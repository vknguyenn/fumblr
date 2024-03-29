import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updatePostThunk, loadPostsThunk } from "../../redux/post";
import { useModal } from "../../context/Modal";


const UpdatePost = ({ post }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(post.post_title)
    const [text, setText] = useState(post.text)
    const [image, setImage] = useState(null)
    const [displayImage, setDisplayImage] = useState(post?.image_url)
    const [imageLoading, setImageLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        if (Object.keys(errors).length > 0) {

            console.error("Cannot submit due to errors:", errors);
            return;
        }

        if (text && title) {
            const formData = new FormData();
    
            formData.append('post_title', title)
            formData.append('text', text)
            if (image && typeof image === 'object') {
                formData.append('image', image);
            }
            
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

        if (title.length > 55) {
            newErrors.title = 'Title cannot exceed 55 characters'
        } 
        if (text.length > 1200) {
            newErrors.text = 'Text cannot exceed 1200 characters'
        } 

        if (image && typeof image === 'object' && image.name) {
            if (!image.name.endsWith('.jpeg') && !image.name.endsWith('.jpg') && !image.name.endsWith('.png') && !image.name.endsWith('.gif')) {
                newErrors.image = 'Image must be in .jpeg, .jpg, .png, or .gif format';
            }
        }
            
        setErrors(newErrors)
    }, [title, text, image]);

    const fileWrap = (e) => {
        e.stopPropagation();
    
        const tempFile = e.target.files[0];
    
        const newImageURL = URL.createObjectURL(tempFile); // Generate a local URL to render the image file inside of the <img> tag.
        setImage(tempFile);
        setDisplayImage(newImageURL);
      }


    return (
        <form id='post-modal' encType='multipart/form-data' onSubmit={handleSubmit}>
            <div className='modal-container'>
                <h2 className='create-post-title'>Update a Post</h2>
                <div className="post-inputs">
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Title:</label>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
                    {submitted && errors.title && <p className='form-errors' style={{color: '#f864ec'}}>{errors.title}</p>}
                </div>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Image (optional):</label>
                    <label htmlFor="update-image">
                    <img className='thumbnail'src={displayImage}></img>
                    <input id='update-image' type='file' accept='image/*' onChange={fileWrap} />
                    <p className="update-text">Click above to update/add an image!</p>
                    </label>
                    {submitted && errors.image && <p className='form-errors'style={{color: '#f864ec'}}>{errors.image}</p>}
                </div>
                <div className='post-form-inputs'>
                    <label className='post-form-labels'>Text: </label>
                    <textarea className='caption-box' type='text' value={text} onChange={e => setText(e.target.value)} />
                    {submitted && errors.text && <p className='form-errors' style={{color: '#f864ec'}}>{errors.text}</p>}
                </div>
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