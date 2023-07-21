"use client"
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/HomeReducer";

const HomeContext = createContext();

const initialState = {
    isSidebarOpen: true,
    profileCard: false,
    videosIndex: {
        games: 0,
        entertainment: 0,
        comedy: 0,
        music: 0,
        programming: 0,
        technology: 0,
    },
    formData: {
        name: "",
        username: "",
        email: "",
        password: "",
        channelId: "",
        channelDescription: ""
    },
    authStatus: false,
    isLoggedIn: false
}

const HomeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const toggleSidebar = () => {
        dispatch({ type: 'Toggle_Sidebar' })
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
        dispatch({ type: 'Toggle_Auth_Status', payload: boolValue })
    }

    const toggleProfileCard = () => {
        dispatch({ type: 'Set_Profile_Card' })
    }

    return (
        <HomeContext.Provider value={{ ...state, toggleSidebar, arrowBtns, formDataChange, setAuthStatus, toggleProfileCard }}>
            {children}
        </HomeContext.Provider>
    )
}



const useHomeContext = () => {
    return useContext(HomeContext)
}

export { HomeContext, HomeContextProvider, useHomeContext }
