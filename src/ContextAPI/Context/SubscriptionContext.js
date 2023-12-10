"use client"
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducer from "../Reducer/SubscriptionReducer";
import { useChannelContext } from "./ChannelContext";
import toast from "react-hot-toast";
import axios from "axios";

const SubscriptionContext = createContext();

const initialState = {
    isSubscribed: false,
}

const SubscriptionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { channelDetail, videoCreatorDetails } = useChannelContext();
    const [subscribersCount, setSubscriberCount] = useState(0);

    useEffect(() => {
        if (videoCreatorDetails.totalSubscribers) {
            setSubscriberCount(videoCreatorDetails.totalSubscribers)
        }
    }, [videoCreatorDetails.totalSubscribers])

    async function handleSubscribe() {
        try {
            // setIsSubscribed(prev => !prev)
            const subscriberData = await axios.post('/api/subscription', {
                creatorChannel: videoCreatorDetails._id,
                subscriberChannel: channelDetail._id
            })
            toast.success(subscriberData.data.message)
            setIsSubscribed(subscriberData.data.subscriptionStatus)
            if (subscriberData.data.subscriptionStatus) {
                setSubscriberCount(prev => prev + 1)
            }
            if (subscribersCount > 0 && !subscriberData.data.subscriptionStatus) {
                setSubscriberCount(prev => prev - 1)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleGetSubscriptions() {
        try {
            (async () => {
                const subscriberData = await axios.post('/api/subscription/getSubscription', {
                    creatorChannel: videoCreatorDetails._id,
                    subscriberChannel: channelDetail._id
                })
                setIsSubscribed(subscriberData.data.subscriptionStatus)
            })()
        } catch (error) {
            console.log(error);
        }
    }

    const setIsSubscribed = (status) => {
        dispatch({ type: 'SET_SUBSCRIPTION_STATUS', payload: status })
    }

    return (
        <SubscriptionContext.Provider value={{ ...state, subscribersCount, setSubscriberCount, handleGetSubscriptions, handleSubscribe }}>
            {children}
        </SubscriptionContext.Provider>
    )
}

const useSubscriptionContext = () => {
    return useContext(SubscriptionContext)
}

export { SubscriptionContext, SubscriptionContextProvider, useSubscriptionContext }
