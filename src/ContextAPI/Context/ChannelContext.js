"use client"
import { createContext, useContext, useReducer } from "react";
import reducer from "../Reducer/ChannelReducer";
import appwriteStorage from "@/appwrite/config";

const ChannelContext = createContext();

const initialState = {
    userDetail: {},
    channelDetail: {},
    videosCategories: ['Games', 'Fashion', 'Music', 'Movies', 'Entertainment'],
    loading: false,
    isVideoUploaded: false,
    videoTitle: '',
}

const ChannelContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setUserDetails = (userData) => {
        dispatch({ type: 'SET_USER_DETAIL', payload: userData })
    }

    const addVideoCategory = (category) => {
        dispatch({ type: 'ADD_MORE_VIDEO_CATEGORY', payload: category })
    }

    const setChannelDetails = (channelData) => {
        dispatch({ type: 'SET_CHANNEL_DETAIL', payload: channelData })
    }

    const setVideoTitle = (fileName) => {
        dispatch({ type: 'SET_FILE_NAME', payload: fileName })
    }

    const handleUploadVideo = async (file) => {
        try {
            dispatch({ type: 'SET_LOADING' })
            const response = await appwriteStorage.uploadVideo(file);
            console.log(response, 'this is response from appwrite');

            if (file.type === 'video/mp4') {
                dispatch({ type: 'SET_UPLOAD_FILE_STATUS', payload: true })
            }

        } catch (error) {
            console.log(error, 'error in uploading file');
        } finally {
            console.log('loading', state.loading);
            dispatch({ type: 'SET_LOADING' })
        }
    }

    const handleListVideos = async () => {
        try {
            dispatch({ type: 'SET_LOADING' })
            const response = await appwriteStorage.listVideos();
            // console.log(response);
            // setVideos(response.files);
            return response;

        } catch (error) {
            console.log(error, 'error in listing files');
        } finally {
            dispatch({ type: 'SET_LOADING' })
        }
    }

    const handleGetVideoView = async (fileId) => {
        try {
            dispatch({ type: 'SET_LOADING' })
            const response = await appwriteStorage.getVideoView(fileId);
            // console.log(response);
            // setVideoUrl(response.href);
        }
        catch (error) {
            console.log(error, 'error in getting file view');
        } finally {
            dispatch({ type: 'SET_LOADING' })
        }
    }

    return (
        <ChannelContext.Provider value={{ ...state, setUserDetails, setChannelDetails, addVideoCategory, setVideoTitle, handleUploadVideo, handleListVideos, handleGetVideoView }}>
            {children}
        </ChannelContext.Provider>
    )
}



const useChannelContext = () => {
    return useContext(ChannelContext)
}

export { ChannelContext, ChannelContextProvider, useChannelContext }
