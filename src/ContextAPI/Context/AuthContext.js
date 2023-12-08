"use client"
import { createContext, useContext, useReducer } from "react";
import reducer from "../Reducer/AuthReducer";

const AuthContext = createContext();

const initialState = {
    // authStatus: false,
    isLoggedIn: false
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // const setAuthStatus = (boolValue) => {
    //     dispatch({ type: 'Set_Auth_Status', payload: boolValue })
    // }

    const setIsLoggedIn = (loggedIn) => {
        dispatch({ type: 'Check_Is_Logged_In', payload: loggedIn })
    }

    return (
        <AuthContext.Provider value={{ ...state, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    return useContext(AuthContext)
}

export { AuthContext, AuthContextProvider, useAuthContext }
