const CommentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return {
                ...state,
                comments: action.payload
            }

        case 'SET_REPLY_BTN_CLICKED_OBJECT':
            const { commentId, boolValue } = action.payload;
            const updatedReplyBtnClickedObject = { ...state.replyBtnClickedObject, [commentId]: boolValue }
            const filteredObject = Object.entries(updatedReplyBtnClickedObject).filter(([key, value])  => value !==  false);

            return {
                ...state,
                replyBtnClickedObject: Object.fromEntries(filteredObject)

            }

        default:
            return state
    }
}

export default CommentsReducer