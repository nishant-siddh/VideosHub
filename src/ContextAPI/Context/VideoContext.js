"use client"
import { createContext, useContext, useReducer } from "react";
import reducer from "../Reducer/VideoReducer";

const VideoContext = createContext();

const initialState = {
}

const VideoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        
        return `${day}-${month}-${year}`;
    };

    return (
        <VideoContext.Provider value={{ ...state, formatDate }}>
            {children}
        </VideoContext.Provider>
    )
}


const useVideoContext = () => {
    return useContext(VideoContext)
}

export { VideoContext, VideoContextProvider, useVideoContext }
