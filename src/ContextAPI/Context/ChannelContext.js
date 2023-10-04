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
    videoTitle: '',
    // openDialogFor: '',

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

    const setFormikValues = (values) => {
        dispatch({ type: 'SET_FORMIK_VALUES', payload: values })
    }

    // const setOpenDialogFor = (dialog) => {
    //     dispatch({ type: 'SET_OPEN_DIALOG_FOR', payload: dialog })
    // }

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

    return (
        <ChannelContext.Provider value={{ ...state, setLoading, setUserDetails, setChannelDetails, addVideoCategory, setVideoTitle, handleListFile, setFormikValues }}>
            {children}
        </ChannelContext.Provider>
    )
}


const useChannelContext = () => {
    return useContext(ChannelContext)
}

export { ChannelContext, ChannelContextProvider, useChannelContext }
