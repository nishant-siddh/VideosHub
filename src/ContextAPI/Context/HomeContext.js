"use client"
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/HomeReducer";
import axios from "axios";

const HomeContext = createContext();

const initialState = {
    profileCard: false,
    isLoading: false,
    videosIndex: {
        games: 0,
        entertainment: 0,
        comedy: 0,
        music: 0,
        programming: 0,
        technology: 0,
    },
    videoCategories: [],
    formData: {
        name: "",
        username: "",
        email: "",
        password: "",
        channelId: "",
        channelDescription: ""
    },
    authStatus: false,
}

const HomeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setIsLoading = (boolValue) => {
        dispatch({ type: 'Set_Is_Loading', payload: boolValue })
    }

    const arrowBtns = (e) => {
        const category = e.target.id;
        const btnType = e.target.name;
        dispatch({ type: 'Arrow_Btns', payload: { category, btnType } })
    };

    const formDataChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({ type: 'Form_Data_Change', payload: { name, value } })
    }

    const setAuthStatus = (boolValue) => {
        dispatch({ type: 'Set_Auth_Status', payload: boolValue })
    }

    const toggleProfileCard = () => {
        dispatch({ type: 'Toggle_Profile_Card' })
    }

    const setVideoCategories = (categories) => {
        dispatch({ type: 'Set_Video_Categories', payload: categories })
    }

    useEffect(() => {
        (async() => {
            try {
                const allCategories = await axios.get('/api/getAllCategories');
                setVideoCategories(allCategories.data.categories);
            } catch (error) {
                console.log(error.message);
            }
        })()
    }, [])

    return (
        <HomeContext.Provider value={{ ...state, setIsLoading, arrowBtns, formDataChange, setAuthStatus, toggleProfileCard, setVideoCategories }}>
            {children}
        </HomeContext.Provider>
    )
}



const useHomeContext = () => {
    return useContext(HomeContext)
}

export { HomeContext, HomeContextProvider, useHomeContext }
