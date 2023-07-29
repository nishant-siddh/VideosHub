const ChannelReducer = (state, action) => {
    switch (action.type) {

        case 'SET_LOADING':
            return {
                ...state,
                loading: !(state.loading)
            }

        case 'SET_UPLOAD_FILE_STATUS':
            return {
                ...state,
                isVideoUploaded: action.payload
            }

        case 'SET_FILE_NAME':
            return {
                ...state,
                videoTitle: action.payload
            }

        case 'SET_USER_DETAIL':
            return {
                ...state,
                userDetail: action.payload
            }

        case 'SET_CHANNEL_DETAIL':
            return {
                ...state,
                channelDetail: action.payload
            }

        case 'ADD_MORE_VIDEO_CATEGORY':
            return {
                ...state,
                videosCategories: [...state.videosCategories, action.payload]
            }

        default:
            return state
    }
}

export default ChannelReducer