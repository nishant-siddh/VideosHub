"use client"
import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { useVideoContext } from "./VideoContext";
import { useChannelContext } from "./ChannelContext";

const LikeReactionContext = createContext();

const LikeReactionContextProvider = ({ children }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const { channelDetail } = useChannelContext();
    const { videoDataForView } = useVideoContext();

    async function handleSetLikes(likeOrDislike) {
        try {
            const reaction = await axios.post('/api/videoReaction/likes', {
                videoId: videoDataForView._id,
                userChannelId: channelDetail._id,
                isLike: likeOrDislike
            })
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async function handleSetDisLikes(likeOrDislike) {
        try {
            const reaction = await axios.post('/api/videoReaction/likes', {
                videoId: videoDataForView._id,
                userChannelId: channelDetail._id,
                isLike: likeOrDislike
            })
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    return (
        <LikeReactionContext.Provider value={{ liked, setLiked, disliked, setDisliked, handleSetLikes, handleSetDisLikes }}>
            {children}
        </LikeReactionContext.Provider>
    )
}

const useLikeReactionContext = () => {
    return useContext(LikeReactionContext)
}

export { LikeReactionContext, LikeReactionContextProvider, useLikeReactionContext }
