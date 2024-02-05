const LOAD_COMMENTS = 'comments/loadComments'
const CREATE_COMMENT = 'comments/createComment'
const UPDATE_COMMENT = 'comments/updateComment'
const DELETE_COMMENT = 'comments/deleteComment'

const loadComments = comments => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

const createComment = comment => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

const updateComment = comment => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

const deleteComment = commentId => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const loadCommentsThunk = () => async(dispatch) => {
    const res = await fetch('/api/posts')
    
    if (res.ok){
        const data = await res.json()
        dispatch(loadComments(data))
        return data
    }
}

export const createCommentThunk = (comment, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({comment}),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createComment(data));
        return data;
    } 
};

export const updateCommentThunk = (comment, commentId) => async(dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: comment
    })

    if (res.ok) {
        const editedComment = await res.json()
        dispatch(updateComment(editedComment));
        return editedComment
    }

}

export const deleteCommentThunk = (commentId) => async(dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteComment(commentId))
    }
}

const initialState = {}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMMENTS:
            return {...action.comments}
        case CREATE_COMMENT:  
        const newState = {
            ...state,
            [action.comment.id]: action.comment
        };
        return newState;
        case UPDATE_COMMENT: {
            return { ...state, [action.comment.id]: action.comment }
        }
        case DELETE_COMMENT: {
            const newState = { ...state };
            delete newState[action.commentId];
            return newState;
        }
        default:
            return state;
    }
}

export default commentReducer