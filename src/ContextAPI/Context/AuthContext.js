"use client"
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/HomeReducer";

const HomeContext = createContext();

const initialState = {
    authStatus: false,
    isLoggedIn: false
}

const HomeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setAuthStatus = (boolValue) => {
        dispatch({ type: 'Set_Auth_Status', payload: boolValue })
    }

    const checkIsLoggedIn = async () => {
        dispatch({ type: 'Check_Is_Logged_In' })
    }

    return (
        <HomeContext.Provider value={{ ...state, setAuthStatus, checkIsLoggedIn }}>
            {children}
        </HomeContext.Provider>
    )
}



const useHomeContext = () => {
    return useContext(HomeContext)
}

export { HomeContext, HomeContextProvider, useHomeContext }
