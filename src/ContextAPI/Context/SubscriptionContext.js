"use client"
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducer from "../Reducer/SubscriptionReducer";
import { useChannelContext } from "./ChannelContext";
import toast from "react-hot-toast";
import axios from "axios";

const SubscriptionContext = createContext();

const initialState = {
    isSubscribed: false,
    allSubscribedChannelsByUser: [],
}

const SubscriptionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { channelDetail, videoCreatorDetails } = useChannelContext();
    const [subscribersCount, setSubscriberCount] = useState(0);

    useEffect(() => {
        if (videoCreatorDetails.channelId?.totalSubscribers) {
            setSubscriberCount(videoCreatorDetails.channelId.totalSubscribers)
        }
    }, [videoCreatorDetails.channelId?.totalSubscribers])

    useEffect(() => {
        if(channelDetail._id){
            handleGetSubscriptions();
        }
    }, [channelDetail._id])

    async function handleSubscribe() {
        try {
            // setIsSubscribed(prev => !prev)
            const subscriberData = await axios.post('/api/subscription', {
                creatorChannel: videoCreatorDetails?.channelId?._id,
                subscriberChannel: channelDetail?._id
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

    const handleIsChannelSubscribed = () => {
        try {
            (async () => {
                const subscriberData = await axios.post('/api/subscription/getSubscription', {
                    creatorChannel: videoCreatorDetails?.channelId?._id,
                    subscriberChannel: channelDetail?._id
                })
                setIsSubscribed(subscriberData.data.subscriptionStatus)
            })()
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetSubscriptions = () => {
        try {
            (async () => {
                const subscriberData = await axios.post('/api/subscription/getAllSubscribedChannelsOfUser', {
                    subscriberChannel: channelDetail._id
                })
                setAllSubscribedChannelsByUser(subscriberData.data.subscribedChannelsByUser)
            })()
        } catch (error) {
            console.log(error);
        }
    }

    const setIsSubscribed = (status) => {
        dispatch({ type: 'SET_SUBSCRIPTION_STATUS', payload: status })
    }

    const setAllSubscribedChannelsByUser = (subscribedChannels) => {
        dispatch({ type: 'SET_ALL_SUBSCRIBED_CHANNELS_BY_USER', payload: subscribedChannels })
    }

    return (
        <SubscriptionContext.Provider value={{ ...state, subscribersCount, setSubscriberCount, handleIsChannelSubscribed, handleSubscribe }}>
            {children}
        </SubscriptionContext.Provider>
    )
}

const useSubscriptionContext = () => {
    return useContext(SubscriptionContext)
}

export { SubscriptionContext, SubscriptionContextProvider, useSubscriptionContext }
