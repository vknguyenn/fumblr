const LOAD_FOLLOWS = "follows/LOAD_FOLLOWS"
const CREATE_FOLLOW = "follows/CREATE_FOLLOW"
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOW"

const loadFollows = (follows) => {
    return {
        type: LOAD_FOLLOWS,
        follows
    }
    }

const createFollow = (follow) => {
    return {
        type: CREATE_FOLLOW,
        follow
    }
}

const removeFollow = (followId) => {
    return {
        type: REMOVE_FOLLOW,
        followId
    }
}

export const loadFollowsThunk = () => async(dispatch) => {
    const res = await fetch('/api/follows')

    if (res.ok) {
        const data = await res.json()
        dispatch(loadFollows(data))
        return data
    }
}

export const createFollowThunk = (followedId) => async (dispatch) => {
    const res = await fetch(`/api/follows/${followedId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(createFollow(data))
        return data
    }
}

export const removeFollowThunk = (followId) => async (dispatch) => {
    const res = await fetch(`/api/follows/${followId}`, {
        method: "DELETE",
    })
    if (res.ok) {
        dispatch(removeFollow(likeId));
    }
}

const initialState = {};

const likeReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_FOLLOWS:
            return { ...state, ...action.follows}
        case CREATE_FOLLOW:
            return { ...state, [action.follow.id]: action.follow }
        case REMOVE_FOLLOW:
            delete newState[action.followId];
            return newState;
        default: 
            return state;
    }
}

export default likeReducer