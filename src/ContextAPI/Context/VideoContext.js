"use client"
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/VideoReducer";
import { useChannelContext } from "./ChannelContext";
import appwriteStorage from "@/appwrite/config";
import axios from "axios";

const VideoContext = createContext();

const initialState = {

    isVideoUploaded: false,
    channelVideos: [],
    dataForEditVideo: {},

    videoDetails: {
        videoId: '',
        videoUrl: '',
        thumbnailId: '',
        thumbnailUrl: '',
        username: '',
        videoCurrentStatus: 'Draft',
    },
    videoDataForView: null,
}

const VideoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { setLoading, channelDetail } = useChannelContext();


    const getVideoDataForView = async (detail, reqComingFrom) => {
        try {
            setLoading();
            if(reqComingFrom === 'dashboard') {
                const videoRes = await axios.get(`/api/videos/getVideoDetails?username=${detail}`)
                setChannelVideos(videoRes.data.videos);
            }
            else if(reqComingFrom === 'editPage'){
                const videoRes = await axios.get(`/api/videos/getVideoDetails?id=${detail}`)
                setDataForEditVideo(videoRes.data.videos);
            }
            
        } catch (error) {
            console.log(error, 'error in getting video details');
            throw error;
        }
        finally {
            setLoading();
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const setChannelVideos = (videos) => {
        dispatch({ type: 'SET_CHANNEL_VIDEOS', payload: videos })
    }

    const setDataForEditVideo = (video) => {
        dispatch({ type: 'SET_DATA_FOR_EDIT_VIDEO', payload: video })
    }

    const setIsVideoUploaded = (status) => {
        dispatch({ type: 'SET_IS_VIDEO_UPLOADED', payload: status })
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

    const handleGetFileView = async (fileId) => {
        try {
            setLoading();
            const response = await appwriteStorage.getFileView(fileId);
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
        if (channelDetail) {
            setVideoDetails(channelDetail.username, 'username');
        }
    }, [channelDetail])

    useEffect(() => {
        if (state.videoDetails.thumbnailId) {
            handleGetFilePreview(state.videoDetails.thumbnailId);
        }
    }, [state.videoDetails.thumbnailId])

    return (
        <VideoContext.Provider value={{ ...state, formatDate, handleUploadFile, handleGetFileView, handleGetFilePreview, handleDeleteFile, setIsVideoUploaded, setVideoDetails, getVideoDataForView, setChannelVideos, setDataForEditVideo }}>
            {children}
        </VideoContext.Provider>
    )
}

const useVideoContext = () => {
    return useContext(VideoContext)
}

export { VideoContext, VideoContextProvider, useVideoContext }
