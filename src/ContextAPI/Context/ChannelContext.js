"use client"
import { createContext, useContext, useEffect, useReducer } from "react";
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

    videoDetails: {
        videoId: '',
        videoUrl: '',
        thumbnailId: '',
        thumbnailUrl: '',
        username: '',
        videoCurrentStatus: '',
    },

    formikValues: {}
}


const ChannelContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setUserDetails = (userData) => {
        dispatch({ type: 'SET_USER_DETAIL', payload: userData })
    }

    const setChannelDetails = (channelData) => {
        dispatch({ type: 'SET_CHANNEL_DETAIL', payload: channelData })
    }

    const addVideoCategory = (category) => {
        dispatch({ type: 'ADD_MORE_VIDEO_CATEGORY', payload: category })
    }

    const setVideoTitle = (fileName) => {
        dispatch({ type: 'SET_FILE_NAME', payload: fileName })
    }

    
    const setIsVideoUploaded = (status) => {
        dispatch({ type: 'SET_IS_VIDEO_UPLOADED', payload: status })
    }

    const setFormikValues = (values) => {
        dispatch({ type: 'SET_FORMIK_VALUES', payload: values })
    }

    const setVideoDetails = (videoDetails, toChange) => {
        dispatch({ type: 'SET_VIDEO_DETAILS', payload: {videoDetails, toChange} })
    }

    // const setThumbnailId = (thumbnailId) => {
    //     dispatch({ type: 'SET_THUMBNAIL_ID', payload: thumbnailId })
    // }

    // const setVideoCurrentStatus = (status) => {
    //     dispatch({ type: 'SET_VIDEO_CURRENT_STATUS', payload: status })
    // }

    const handleUploadFile = async (file) => {
        try {
            dispatch({ type: 'SET_LOADING' })
            const response = await appwriteStorage.uploadFile(file);

            if (file.type === 'video/mp4') {
                setIsVideoUploaded(true);
                setVideoDetails(response.$id, 'videoId');
                // dispatch({ type: 'SET_VIDEO_ID', payload: response.$id })
                // setVideoCurrentStatus('Draft');
                setVideoDetails('Draft', 'videoCurrentStatus')
            }

            if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
                setVideoDetails(response.$id, 'thumbnailId');
            }


        } catch (error) {
            console.log(error, 'error in uploading file');
        } finally {
            dispatch({ type: 'SET_LOADING' })
        }
    }

    const handleListFile = async () => {
        try {
            dispatch({ type: 'SET_LOADING' })
            const response = await appwriteStorage.listFiles();
            return response;

        } catch (error) {
            console.log(error, 'error in listing files');
        } finally {
            dispatch({ type: 'SET_LOADING' })
        }
    }

    const handleGetFileView = async (fileId) => {
        try {
            dispatch({ type: 'SET_LOADING' })
            const response = await appwriteStorage.getFileView(fileId);
            // dispatch({ type: 'SET_VIDEO_URL', payload: response.href })
            setVideoDetails(response.href, 'videoUrl');
        }
        catch (error) {
            console.log(error, 'error in getting file view');
        } finally {
            dispatch({ type: 'SET_LOADING' })
        }
    }

    const handleGetFilePreview = async (fileId) => {
        try {
            dispatch({ type: 'SET_LOADING' })
            const response = await appwriteStorage.getFilePreview(fileId);
            setVideoDetails(response.href, 'thumbnailUrl');
        }
        catch (error) {
            console.log(error, 'error in getting file preview');
        } finally {
            dispatch({ type: 'SET_LOADING' })
        }
    }

    const handleDeleteFile= async (fileId, file) => {
        try {
            dispatch({ type: 'SET_LOADING' })
            const response = await appwriteStorage.deleteFile(fileId);
            return response.href;
        }
        catch (error) {
            console.log(error, 'error in deleting file');
        } finally {
            dispatch({ type: 'SET_LOADING' })
        }
    }

    useEffect(() => {
        // dispatch({ type: 'SET_USERNAME_TO_VIDEOSDETAILS' })
        setVideoDetails(state.channelDetail.username, 'username');
    }, [state.channelDetail.username])

    return (
        <ChannelContext.Provider value={{ ...state, setUserDetails, setChannelDetails, addVideoCategory, setVideoTitle, handleUploadFile, handleListFile, handleGetFileView, handleGetFilePreview, setIsVideoUploaded, setFormikValues, handleDeleteFile, setVideoDetails }}>
            {children}
        </ChannelContext.Provider>
    )
}


const useChannelContext = () => {
    return useContext(ChannelContext)
}

export { ChannelContext, ChannelContextProvider, useChannelContext }
