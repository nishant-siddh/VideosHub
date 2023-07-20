const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'Check_Is_Logged_In':
            return {
                ...state,
                isLoggedIn: action.payload
            }
    
        default:
            return state
    }
}

export default AuthReducer