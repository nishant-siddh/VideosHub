"use client"
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/CommentsReducer";
import { useChannelContext } from "./ChannelContext";
import { useVideoContext } from "./VideoContext";
import axios from "axios";

const CommentsContext = createContext();

const initialState = {
    comments: [],
    replies: {},
    replyBtnClickedObject: {},
}

const CommentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { channelDetail, userDetail } = useChannelContext();
    const { videoDataForView } = useVideoContext();

    async function handleComment({ commentInputValue, setCommentInputValue }) {
        try {
            const commentRes = await axios.post("/api/comments/addComments", {
                videoId: videoDataForView._id,
                userChannelId: channelDetail._id,
                commentText: commentInputValue
            });
            console.log(commentRes.data);
            setCommentInputValue("");
            handleGetComments();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function handleGetComments() {
        try {
            const commentRes = await axios.post('/api/comments/getComments', {
                videoId: videoDataForView._id
            })
            commentRes.data.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setComments(commentRes.data.comments);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function handleReply(commentId, replyInputValue, setReplyInputValue) {
        try {
            const commentRes = await axios.post("/api/comments/replies/addReplies", {
                commentId,
                userChannelId: channelDetail._id,
                replyText: replyInputValue
            });
            setReplyInputValue("");
            setReplyBtnClickedObject(commentId, false);
            handleGetComments();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function handleRepliesOfReply(commentId, username, originalCommentId, replyInputValue, setReplyInputValue) {
        try {
            const commentRes = await axios.post("/api/comments/replies/addRepliesOfReply", {
                commentId,
                username,
                originalCommentId,
                userChannelId: channelDetail._id,
                replyText: replyInputValue
            });
            setReplyInputValue("");
            setReplyBtnClickedObject(commentId, false);
            handleGetComments();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function handleGetReplies(commentId) {
        try {
            const repliesRes = await axios.post('/api/comments/replies/getReplies', {
                commentId
            })
            setReplies(commentId, repliesRes.data.replies);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const setReplies = (commentIdOfReplies, replies) => {
        dispatch({ type: "SET_REPLIES", payload: { commentIdOfReplies, replies } });
    }

    const setComments = (comments) => {
        dispatch({ type: "SET_COMMENTS", payload: comments });
    }

    const setReplyBtnClickedObject = (commentId, boolValue) => {
        dispatch({ type: "SET_REPLY_BTN_CLICKED_OBJECT", payload: { commentId, boolValue } });
    }

    // useEffect(() => {
    //     if (videoDataForView && videoDataForView.comments) {
    //         setComments(videoDataForView.comments);
    //         // setReplyBtnClickedObject('all', false);
    //     }
    // }, [videoDataForView && videoDataForView.comments]);

    // useEffect(() => {
    //     if (state.replyBtnClickedObject) {
    //         const filteredEntries = Object.entries(state.replyBtnClickedObject).filter(([key, value]) => value !== false);
    //         const filteredObject = Object.fromEntries(filteredEntries);
    //         // setReplyBtnClickedObject(filteredObject);
    //     }
    // }, [state.replyBtnClickedObject])


    return (
        <CommentsContext.Provider value={{ ...state, handleComment, handleReply, handleRepliesOfReply, handleGetComments, handleGetReplies, setComments, setReplyBtnClickedObject }}>
            {children}
        </CommentsContext.Provider>
    )
}



const useCommentsContext = () => {
    return useContext(CommentsContext)
}

export { CommentsContext, CommentsContextProvider, useCommentsContext }
