const CommentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return {
                ...state,
                comments: action.payload
            }

        case 'SET_REPLY_BTN_CLICKED_ARRAY':
            const { index, boolValue } = action.payload;
            let newArray;
            if (index === 'all') {
                newArray = new Array(state.comments.length).fill(boolValue);
            }
            else {
                newArray = [...state.replyBtnClickedArray];
                newArray[index] = boolValue;
            }

            return {
                ...state,
                replyBtnClickedArray: newArray
            }

        default:
            return state
    }
}

export default CommentsReducer