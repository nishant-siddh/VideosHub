"use client"
import { createContext, useContext } from "react";

const TimeAndDateContext = createContext();

const TimeAndDateContextProvider = ({ children }) => {
    const formatter = new Intl.RelativeTimeFormat(undefined, {
        numeric: "auto",
    })

    const DIVISIONS = [
        { amount: 60, name: "seconds" },
        { amount: 60, name: "minutes" },
        { amount: 24, name: "hours" },
        { amount: 7, name: "days" },
        { amount: 4.34524, name: "weeks" },
        { amount: 12, name: "months" },
        { amount: Number.POSITIVE_INFINITY, name: "years" },
    ]

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    function formatTimeAgo(date) {
        let duration = (date - new Date()) / 1000

        for (let i = 0; i < DIVISIONS.length; i++) {
            const division = DIVISIONS[i]
            if (Math.abs(duration) < division.amount) {
                return formatter.format(Math.round(duration), division.name)
            }
            duration /= division.amount
        }
    }

    return (
        <TimeAndDateContext.Provider value={{ formatDate, formatTimeAgo }}>
            {children}
        </TimeAndDateContext.Provider>
    )
}



const useTimeAndDateContext = () => {
    return useContext(TimeAndDateContext)
}

export { TimeAndDateContext, TimeAndDateContextProvider, useTimeAndDateContext }
