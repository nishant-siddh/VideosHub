const HomeReducer = (state, action) => {
    switch (action.type) {
        case 'Set_Is_Loading':
            return {
                ...state,
                isLoading: action.payload,
            }

        case 'Toggle_Profile_Card':
            return {
                ...state,
                profileCard: !(state.profileCard),
            }
        
        case 'Arrow_Btns':
            const {category, btnType} = action.payload;
            if(btnType === 'previous'){
                return {
                    ...state,
                    videosIndex: {
                        ...state.videosIndex,
                        [category]: state.videosIndex[category] - 1
                    }
                }
            }
            if(btnType === 'next'){
                return {
                    ...state,
                    videosIndex: {
                        ...state.videosIndex,
                        [category]: state.videosIndex[category] + 1
                    }
                }
            }

        case 'Set_Video_Categories':
            return {
                ...state,
                videoCategories: action.payload
            }

        case 'Form_Data_Change':
            const {name, value} = action.payload;
            
            return {
                ...state,
                formData: {...state.formData, [name]: value},
            }

        case 'Set_Auth_Status':
            return {
                ...state,
                authStatus: action.payload
            }
    
        default:
            return state
    }
}

export default HomeReducer