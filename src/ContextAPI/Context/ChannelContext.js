"use client"
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/ChannelReducer";
import appwriteStorage from "@/appwrite/config";
import axios from "axios";

const ChannelContext = createContext();

const initialState = {
    userDetail: {},
    channelDetail: {},
    videosCategories: ['Games', 'Fashion', 'Music', 'Movies', 'Entertainment'],
    isLoading: false,
    videoTitle: '',
    formikValues: {},
    videoCreatorDetails: {}
}


const ChannelContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getChannelAndUserDetails = async () => {
        try {
            const response = await axios.get('/api/channel/channelTokenId')
            const resChannel = await axios.post(`/api/channel/channelDetails`, { id: response.data });
            const resUser = await axios.post(`/api/users/userDetails`, { id: resChannel.data.channelData._id });
            setChannelDetails(resChannel.data.channelData);
            setUserDetails(resUser.data.userData);
        } catch (error) {
            console.log(error, 'error in getting channel and user details');
            throw error;
        }
    }

    const handleGetCreatorDetails = async (creatorUsernameOrId, reqWith) => {
        console.log(creatorUsernameOrId, 'creator username or id');
        try {
            const response = await axios.post('/api/getCreatorDetails', { creatorUsernameOrId, reqWith });
            console.log(response);
            setVideoCreatorDetails(response.data.creatorDetails);
            return response.data.creatorDetails.name;
        } catch (error) {
            console.log(error, 'error in getting creator details');
            throw error;
        }
    }
    console.log(state.videoCreatorDetails, 'state.videoCreatorDetails');

    const setVideoCreatorDetails = (details) => {
        dispatch({ type: 'SET_VIDEO_CREATOR_DETAILS', payload: details })
    }


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

    const setFormikValues = (values) => {
        dispatch({ type: 'SET_FORMIK_VALUES', payload: values })
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

    useEffect(() => {
        (async () => {
            getChannelAndUserDetails();
        })()
    }, [])

    return (
        <ChannelContext.Provider value={{ ...state, handleGetCreatorDetails, setLoading, setUserDetails, setChannelDetails, addVideoCategory, setVideoTitle, handleListFile, setFormikValues, getChannelAndUserDetails }}>
            {children}
        </ChannelContext.Provider>
    )
}

const useChannelContext = () => {
    return useContext(ChannelContext)
}

export { ChannelContext, ChannelContextProvider, useChannelContext }
