const SubscriptionReducer = (state, action) => {
    switch (action.type) {

        case 'SET_SUBSCRIPTION_STATUS':
            return {
                ...state,
                isSubscribed: action.payload
            }

        default:
            return state
    }
}

export default SubscriptionReducer