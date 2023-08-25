const ChannelReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: !(state.loading)
            }

        case 'SET_IS_VIDEO_UPLOADED':
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

        case 'SET_FORMIK_TITLE':
            return {
                ...state,
                formikValues: {
                    ...state.formikValues,
                    title: state.videoTitle
                }
            }

        case 'SET_VIDEO_DETAILS':
            return {
                ...state,
                videoDetails: {
                    ...state.videoDetails,
                    [action.payload.toChange]: action.payload.videoDetail
                }
            }

        case 'SET_FORMIK_VALUES':
            return {
                ...state,
                formikValues: action.payload
            }

        default:
            return state
    }
}

export default ChannelReducer