"use client"
import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext(null);

const SidebarContextProvider = ({ children }) => {
    const [isLargeOpen, setIsLargeOpen] = useState(true);
    const [isSmallOpen, setIsSmallOpen] = useState(false);

    useEffect(() => {
        const handler = () => {
            if(!isScreenSmall()) {
                setIsSmallOpen(false)
            }
        }

        window.addEventListener('resize', handler)

        return () => {
            window.removeEventListener('resize', handler)
        }
    }, [])

    const isScreenSmall = () => {
        return window.innerWidth < 1024;
    }

    const toggleSidebar = () => {
        if(isScreenSmall()) {
            setIsSmallOpen(s => !s);
        }
        else{
            setIsLargeOpen(l => !l)
        }
    }
    
    const closeSidebar = () => {
        if(isScreenSmall()) {
            setIsSmallOpen(false)
        }
        else{
            setIsLargeOpen(false)
        }
    }

    return (
        <SidebarContext.Provider value={{ isLargeOpen, isSmallOpen, setIsLargeOpen, setIsSmallOpen, toggleSidebar, closeSidebar }}>
            {children}
        </SidebarContext.Provider>
    )
}


const useSidebarContext = () => {
    const value = useContext(SidebarContext)
    if(value === null) throw new Error('SidebarContextProvider is not found')
    return value
}

export { SidebarContext, SidebarContextProvider, useSidebarContext }
