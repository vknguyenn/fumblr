const LOAD_LIKES = "likes/LOAD_LIKES"
const CREATE_LIKE = "likes/CREATE_LIKE"
const REMOVE_LIKE = "likes/REMOVE_LIKE"

const loadLikes = (likes) => {
    return {
        type: LOAD_LIKES,
        likes
    }
    }

const createLike = (like) => {
    return {
        type: CREATE_LIKE,
        like
    }
}

const removeLike = (likeId) => {
    return {
        type: REMOVE_LIKE,
        likeId
    }
}

export const loadLikesThunk = () => async(dispatch) => {
    const res = await fetch('/api/likes')

    if (res.ok) {
        const data = await res.json()
        dispatch(loadLikes(data))
        return data
    }
}

export const createLikeThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postId)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(createLike(data))
        return data
    }
}

export const removeLikeThunk = (likeId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${likeId}`, {
        method: "DELETE",
    })
    if (res.ok) {
        dispatch(removeLike(likeId));
    }
}

const initialState = {};

const likeReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_LIKES:
            return { ...state, ...action.likes}
        case CREATE_LIKE:
            return { ...state, [action.like.id]: action.like }
        case REMOVE_LIKE:
            delete newState[action.likeId];
            return newState;
        default: 
            return state;
    }
}

export default likeReducer