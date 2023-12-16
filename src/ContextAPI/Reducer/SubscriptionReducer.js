const SubscriptionReducer = (state, action) => {
    switch (action.type) {

        case 'SET_SUBSCRIPTION_STATUS':
            return {
                ...state,
                isSubscribed: action.payload
            }

        case 'SET_ALL_SUBSCRIBED_CHANNELS_BY_USER':
            return {
                ...state,
                allSubscribedChannelsByUser: action.payload
            }

        default:
            return state
    }
}

export default SubscriptionReducer