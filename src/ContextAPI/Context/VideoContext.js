"use client"
import { createContext, useContext, useReducer } from "react";
import reducer from "../Reducer/VideoReducer";

const VideoContext = createContext();

const initialState = {
}

const VideoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <VideoContext.Provider value={{ ...state }}>
            {children}
        </VideoContext.Provider>
    )
}


const useVideoContext = () => {
    return useContext(VideoContext)
}

export { VideoContext, VideoContextProvider, useVideoContext }
