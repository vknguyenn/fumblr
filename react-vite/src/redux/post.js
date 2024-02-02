const LOAD_POSTS = 'posts/loadPosts'
const LOAD_ONE_POST = 'post/loadOnePost'
const CREATE_POST = 'posts/createPost'
const UPDATE_POST = 'post/updatePost'
const DELETE_POST = 'posts/deletePost'

const loadPosts = posts => {
    return {
        type: LOAD_POSTS,
        posts
    }
}

const loadOnePost = post => {
    return {
        type: LOAD_ONE_POST,
        post
    }
}

const createPost = post => {
    return {
        type: CREATE_POST,
        post
    }
}
const updatePost = post => {
    return {
        type: UPDATE_POST,
        post
    }
}
const deletePost = postId => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const loadPostsThunk = () => async(dispatch) => {
    const res = await fetch('/api/posts')
    
    if (res.ok){
        const data = await res.json()
        dispatch(loadPosts(data))
        return data
    }
}

export const loadOnePostThunk = (postId) => async(dispatch) => {
    const res = await fetch(`/api/posts/${postId}`)
    
    if (res.ok) {
        const data = await res.json()
        dispatch(loadOnePost(data));
        return data
    }
}

export const createPostThunk = (post) => async(dispatch) => {
    const res = await fetch('/api/posts', {
        method: "POST",
        body: post
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createPost(data))
        return data
    }
}

export const updatePostThunk = (post, postId) => async(dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: post
    })

    if (res.ok) {
        const editedPost = await res.json()
        dispatch(updatePost(editedPost));
        return editedPost
    }

}

export const deletePostThunk = (postId) => async(dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    })
    if (res.ok) {
        dispatch(deletePost(postId))
    }
}

const initialState = {}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: {
            const newState = { ...state }
            action.posts.posts.forEach(post => {
                newState[post.id] = post
            })
            return newState;
        }
        case LOAD_ONE_POST: {
            const newState = { ...state };
            newState[action.post.id] = action.post
            return newState;
        }
        case CREATE_POST: {
            const newState = { ...state, [action.post.id]: action.post }
            return newState;
        }
        case UPDATE_POST: {
            const newState = { ...state, [action.post.id]: action.post }
            return newState;
        }
        case DELETE_POST: {
            const newState = { ...state }
            delete newState[action.postId]
            return newState
        }
    default:
        return state;
    }
}

export default postReducer