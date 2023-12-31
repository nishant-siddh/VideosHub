import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import {
    AiOutlineLike,
    AiOutlineDislike,
    AiFillLike,
    AiFillDislike,
    AiOutlineUserAdd,
} from "react-icons/ai";
import { FaFolderPlus } from "react-icons/fa";
import profileImage from "@/Images/profilePicture.jpeg";
import axios from 'axios';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import { useLikeReactionContext } from '@/ContextAPI/Context/LikeReactionContext';
import { IoMdCheckmark } from "react-icons/io";
import { useSubscriptionContext } from '@/ContextAPI/Context/SubscriptionContext';
import Link from 'next/link';


const VideoDetailsSection = () => {
    const { userDetail, channelDetail, videoCreatorDetails } = useChannelContext();
    const { videoDataForView } = useVideoContext();
    const { liked, setLiked, disliked, setDisliked, handleSetLikes, handleSetDisLikes } = useLikeReactionContext();
    const { subscribersCount, isSubscribed, handleIsChannelSubscribed, handleSubscribe } = useSubscriptionContext();

    useEffect(() => {
        if (channelDetail._id && videoDataForView.uploadedBy) {
            handleIsChannelSubscribed();
        }
    }, [channelDetail._id && videoDataForView.uploadedBy])

    // useEffect(() => {
    //     if (isSubscribed) {
    //         setSubscriberCount(prev => prev + 1)
    //     }
    //     if (subscribersCount > 0 && !isSubscribed) {
    //         setSubscriberCount(prev => prev - 1)
    //     }
    // }, [isSubscribed])

    function handleLikeReaction() {
        setLiked(prev => !prev)
        if (disliked) {
            setDisliked(false)
        }
        handleSetLikes(true)
    }

    function handleDislikeReaction() {
        setDisliked(prev => !prev)
        if (liked) {
            setLiked(false)
        }
        handleSetDisLikes(false)
    }

    useEffect(() => {
        if (videoDataForView._id && channelDetail._id) {
            try {
                (async () => {
                    const likesRes = await axios.post('/api/videoReaction/getReaction', {
                        videoId: videoDataForView._id,
                        userChannelId: channelDetail._id
                    })
                    if (likesRes.data.reaction) {
                        setLiked(true)
                    } else if (likesRes.data.reaction === false) {
                        setDisliked(true)
                    }
                })()
            } catch (error) {
                console.log(error);
            }
        }
    }, [videoDataForView._id, channelDetail._id])

    return (
        <div className="flex flex-wrap gap-3 justify-between">
            <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-fit">
                    <Image
                        src={profileImage}
                        width={20}
                        height={20}
                        className="w-8 rounded-full"
                        alt=""
                    />
                </div>
                <div className="flex sm:justify-between items-center gap-3 sm:w-fit w-full sm:flex-shrink-0">
                    <div className="flex flex-col">
                        <h6>{userDetail.name}</h6>
                        <span className="text-xs text-zinc-400">
                            {/* {channelDetail.totalSubscribers} subscribers */}
                            {subscribersCount} subscribers
                        </span>
                    </div>
                    {channelDetail._id !== videoCreatorDetails.channelId?._id ? (
                        <button
                            className={`text-xs lg:text-sm text-gray-500 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 hover:text-gray-400 ${isSubscribed && 'bg-green-500 text-white hover:bg-green-600 hover:text-white'}
                        ${!isSubscribed && 'bg-white shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out -translate-x-[5px] -translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] delay-75'}`}
                            onClick={handleSubscribe}
                        >
                            <span>{isSubscribed ? <IoMdCheckmark /> : <AiOutlineUserAdd />}</span>
                            <p>{isSubscribed ? 'Subscribed' : 'Subscribe'}</p>
                        </button>
                    ) : (
                        <Link href={`/dashboard/${videoCreatorDetails.channelId?._id}`}>
                            <button
                                className='text-xs lg:text-sm text-gray-500 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 hover:text-gray-400 bg-white shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]'
                            >
                                <p>Manage Videos</p>
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            {/* likes dislikes and save button */}
            <div className="flex gap-1 md:gap-3 justify-between md:justify-end sm:flex-shrink-0 items-center text-xs w-full sm:w-fit lg:text-sm">
                <div className="flex rounded-full border">
                    <button className="px-2 md:px-3 py-1 rounded-l-full border-r-2 flex gap-1 items-center hover:bg-zinc-800 transition delay-75" onClick={handleLikeReaction}>
                        {liked ? <AiFillLike /> : <AiOutlineLike />} Like
                    </button>
                    <button className="px-2 md:px-3 py-1 rounded-r-full flex gap-1 items-center hover:bg-zinc-800 transition delay-75" onClick={handleDislikeReaction}>
                        {disliked ? <AiFillDislike /> : <AiOutlineDislike />} Dislike
                    </button>
                </div>
                <button className="border px-2 md:px-3 py-1 rounded-full flex items-center gap-1 hover:bg-zinc-800 transition delay-75">
                    <FaFolderPlus /> Save
                </button>
            </div>
        </div>
    )
}

export default VideoDetailsSection