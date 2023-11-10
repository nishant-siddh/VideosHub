import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import Image from 'next/image';
import React, { useState } from 'react'
import {
    AiOutlineLike,
    AiOutlineDislike,
    AiFillLike,
    AiFillDislike,
    AiOutlineUserAdd,
} from "react-icons/ai";
import { FaFolderPlus } from "react-icons/fa";
import profileImage from "@/Images/profilePicture.jpeg";

const VideoDetailsSection = () => {
    const { userDetail, channelDetail } = useChannelContext();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

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
                            {channelDetail.totalSubscribers} subscribers
                        </span>
                    </div>
                    <button className="text-xs lg:text-sm text-gray-500 px-2 md:px-3 py-1 rounded-full bg-white hover:text-gray-400 flex items-center gap-1 shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                        <AiOutlineUserAdd />
                        Subscribe
                    </button>
                </div>
            </div>

            {/* likes dislikes and save button */}
            <div className="flex gap-1 md:gap-3 justify-between md:justify-end sm:flex-shrink-0 items-center text-xs w-full sm:w-fit lg:text-sm">
                <div className="flex rounded-full border">
                    <button className="px-2 md:px-3 py-1 rounded-l-full border-r-2 flex gap-1 items-center hover:bg-zinc-800 transition delay-75">
                        {liked ? <AiFillLike /> : <AiOutlineLike />} Like
                    </button>
                    <button className="px-2 md:px-3 py-1 rounded-r-full flex gap-1 items-center hover:bg-zinc-800 transition delay-75">
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