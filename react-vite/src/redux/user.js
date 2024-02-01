const LOAD_USERS = "user/loadUsers"

const loadUsers = users => {
    return {
        type: LOAD_USERS,
        users
    }
}

export const loadUsersThunk = () => async(dispatch) => {
    const res = await fetch('/api/users')

    if (res.ok) {
        const data = await res.json();
        dispatch(loadUsers(data))
        return data
    }
}

const initialState = {}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS: {
            const newState = { ...state };
            action.users.users.forEach(user => {
                newState[user.id] = user
            })
            return newState;
        }
       
        default:
            return state
    }

}

export default userReducer