const LOAD_COMMENTS = 'comments/loadComments'
// const CREATE_COMMENT = 'comments/createComment'

const loadComments = comments => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

// const createComment = comment => {
//     return {
//         type: CREATE_COMMENT,
//         comment
//     }
// }

export const loadCommentsThunk = () => async(dispatch) => {
    const res = await fetch('/api/comments')
    
    if (res.ok){
        const data = await res.json()
        dispatch(loadComments(data))
        return data
    }
}

const initialState = {}

const commentReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_COMMENTS:
            return {...action.comments}
        default:
            return newState;
    }
}

export default commentReducer