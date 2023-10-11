const VideoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VIDEO_DETAILS':
            return {
                ...state,
                videoDetails: {
                    ...state.videoDetails,
                    [action.payload.toChange]: action.payload.videoDetail
                }
            }

        case 'SET_CHANNEL_VIDEOS':
            return {
                ...state,
                channelVideos: action.payload
            }

        case 'SET_DATA_FOR_EDIT_VIDEO':
            return {
                ...state,
                dataForEditVideo: action.payload
            }

        case 'SET_IS_VIDEO_UPLOADED':
            return {
                ...state,
                isVideoUploaded: action.payload
            }

        default:
            return state
    }
}

export default VideoReducer