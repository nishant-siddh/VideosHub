"use client"
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/CommentsReducer";
import { useChannelContext } from "./ChannelContext";
import { useVideoContext } from "./VideoContext";
import axios from "axios";

const CommentsContext = createContext();

const initialState = {
    comments: [],
    replyBtnClickedObject: {},

}

const CommentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { channelDetail, userDetail } = useChannelContext();
    const { videoDataForView } = useVideoContext();


    console.log(state.replyBtnClickedObject, 'state.replyBtnClickedObject');

    async function handleComment({ commentInputValue, setCommentInputValue }) {
        try {
            const commentRes = await axios.post("/api/comments", {
                videoId: videoDataForView.videoId,
                commentOrReply: "comment",
                commentText: commentInputValue,
                channelDetail: channelDetail,
                userDetail: userDetail,
            });
            setComments(commentRes.data.videoComments);
            setCommentInputValue("");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function handleReply(index, commentId, replyInputValue, setReplyInputValue) {
        try {
            const commentRes = await axios.post("/api/comments", {
                videoId: videoDataForView.videoId,
                commentOrReply: "reply",
                commentText: replyInputValue,
                channelDetail: channelDetail,
                userDetail: userDetail,
                index
            });
            setComments(commentRes.data.videoComments);
            setReplyInputValue("");
            setReplyBtnClickedObject(commentId, false);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const setComments = (comments) => {
        dispatch({ type: "SET_COMMENTS", payload: comments });
    }

    const setReplyBtnClickedObject = (commentId, boolValue) => {
        dispatch({ type: "SET_REPLY_BTN_CLICKED_OBJECT", payload: { commentId, boolValue } });
    }


    useEffect(() => {
        if (videoDataForView.comments) {
            setComments(videoDataForView.comments);
            // setReplyBtnClickedObject('all', false);
        }
    }, [videoDataForView.comments]);

    useEffect(() => {
        if (state.replyBtnClickedObject) {
            const filteredEntries = Object.entries(state.replyBtnClickedObject).filter(([key, value]) => value !== false);
            const filteredObject = Object.fromEntries(filteredEntries);
            // setReplyBtnClickedObject(filteredObject);
        }
    }, [state.replyBtnClickedObject])


    return (
        <CommentsContext.Provider value={{ ...state, handleComment, handleReply, setComments, setReplyBtnClickedObject }}>
            {children}
        </CommentsContext.Provider>
    )
}



const useCommentsContext = () => {
    return useContext(CommentsContext)
}

export { CommentsContext, CommentsContextProvider, useCommentsContext }
