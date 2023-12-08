"use client"
import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";

const LikesContext = createContext();

const LikesContextProvider = ({ children }) => {

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    async function handleSetLikes(likeOrDislike) {
        try {
            const reaction = await axios.post('/api/likes', {
                videoId: "616a8b1f2d6c3e1c7b2c5c1f",
                userId: "616a8b1f2d6c3e1c7b2c5c1f",
                isLike: likeOrDislike
            })
            setLiked(likeOrDislike);
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
    
    async function handleSetDisLikes(likeOrDislike) {
        try {
            const reaction = await axios.post('/api/likes', {
                videoId: "616a8b1f2d6c3e1c7b2c5c1f",
                userId: "616a8b1f2d6c3e1c7b2c5c1f",
                isLike: likeOrDislike
            })
            setDisliked(likeOrDislike);
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    return (
        <LikesContext.Provider value={{ liked, disliked, handleSetLikes, handleSetDisLikes }}>
            {children}
        </LikesContext.Provider>
    )
}

const useLikesContext = () => {
    return useContext(LikesContext)
}

export { LikesContext, LikesContextProvider, useLikesContext }
