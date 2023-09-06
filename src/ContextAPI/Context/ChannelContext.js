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
        videoCurrentStatus: 'Draft',
    },

    formikValues: {}
}


const ChannelContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setLoading = () => {
        dispatch({ type: 'SET_LOADING' })
    }

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

    const setVideoDetails = (videoDetail, toChange) => {
        dispatch({ type: 'SET_VIDEO_DETAILS', payload: { videoDetail, toChange } })
    }

    const handleUploadFile = async (file) => {
        try {
            setLoading();
            const response = await appwriteStorage.uploadFile(file);

            if (file.type === 'video/mp4') {
                setIsVideoUploaded(true);
                setVideoDetails(response.$id, 'videoId');
            }

            if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
                setVideoDetails(response.$id, 'thumbnailId');
            }


        } catch (error) {
            console.log(error, 'error in uploading file');
        } finally {
            setLoading();
        }
    }

    const handleListFile = async () => {
        try {
            setLoading();
            const response = await appwriteStorage.listFiles();
            return response;

        } catch (error) {
            console.log(error, 'error in listing files');
        } finally {
            setLoading();
        }
    }

    const handleGetFileView = async (fileId) => {
        try {
            setLoading();
            const response = await appwriteStorage.getFileView(fileId);
            // dispatch({ type: 'SET_VIDEO_URL', payload: response.href })
            setVideoDetails(response.href, 'videoUrl');
        }
        catch (error) {
            console.log(error, 'error in getting file view');
        } finally {
            setLoading();
        }
    }

    const handleGetFilePreview = async (fileId) => {
        try {
            setLoading();
            const response = await appwriteStorage.getFilePreview(fileId);
            setVideoDetails(response.href, 'thumbnailUrl');
            // return response.href;
        }
        catch (error) {
            console.log(error, 'error in getting file preview');
        } finally {
            setLoading();
        }
    }

    const handleDeleteFile = async (fileId) => {
        try {
            setLoading();
            await appwriteStorage.deleteFile(fileId);
        }
        catch (error) {
            console.log(error, 'error in deleting file');
        } finally {
            setLoading();
        }
    }

    useEffect(() => {
        if (state.channelDetail) {
            setVideoDetails(state.channelDetail.username, 'username');
        }
    }, [state.channelDetail])

    return (
        <ChannelContext.Provider value={{ ...state, setLoading, setUserDetails, setChannelDetails, addVideoCategory, setVideoTitle, handleUploadFile, handleListFile, handleGetFileView, handleGetFilePreview, setIsVideoUploaded, setFormikValues, handleDeleteFile, setVideoDetails }}>
            {children}
        </ChannelContext.Provider>
    )
}


const useChannelContext = () => {
    return useContext(ChannelContext)
}

export { ChannelContext, ChannelContextProvider, useChannelContext }
