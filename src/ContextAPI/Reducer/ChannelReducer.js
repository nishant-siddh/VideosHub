const ChannelReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: !(state.isLoading)
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

        case 'SET_FORMIK_VALUES':
            return {
                ...state,
                formikValues: action.payload
            }

        case 'SET_VIDEO_CREATOR_DETAILS':
            return {
                ...state,
                videoCreatorDetails: action.payload
            }

        default:
            return state
    }
}

export default ChannelReducer