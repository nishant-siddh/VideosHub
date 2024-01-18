import React, { useEffect } from 'react'
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";
import ProfilePicture from './ProfilePicture';
import { useSubscriptionContext } from '@/ContextAPI/Context/SubscriptionContext';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/ContextAPI/Context/AuthContext';

const ChannelHeader = ({ param }) => {
    const router = useRouter();
    const { isLoggedIn } = useAuthContext();
    const { userDetail, channelDetail, videoCreatorDetails } = useChannelContext();
    const { videoDataForView } = useVideoContext();
    const { subscribersCount, isSubscribed, handleIsChannelSubscribed, handleSubscribe } = useSubscriptionContext();

    useEffect(() => {
        if (channelDetail._id && videoDataForView) {
            handleIsChannelSubscribed();
        }
    }, [channelDetail._id && videoDataForView])

    function handleRedirectToLogin() {
        router.push("/login");
    }

    return (
        <div className='w-full flex flex-col sm:flex-row items-center gap-3'>
            <ProfilePicture />

            {/* channel details and subscribe button */}
            <div className='w-4/5 flex flex-col sm:flex-row items-center justify-between gap-2'>
                <div className='flex flex-col items-center sm:items-start text-zinc-400'>
                    {/* creator name */}
                    <div className='text-white tracking-wider'>
                        <h1 className='text-xl sm:text-2xl'>{videoCreatorDetails.name}</h1>
                    </div>

                    {/* username and subscribers count and videos count */}
                    <div className='flex flex-wrap justify-center text-xs sm:text-sm gap-1'>
                        <p>@{`${videoCreatorDetails.channelId?.username}`.toLowerCase()}</p>
                        <p>{subscribersCount} Subscribers</p>
                        <p> {videoCreatorDetails.channelId?.videosId.length} videos</p>
                    </div>

                    {/* channel description */}
                    <p className='text-xs sm:text-sm mt-1'>{videoCreatorDetails.channelId?.channelDescription}</p>
                </div>

                {/* subscribe button */}
                {channelDetail._id !== videoCreatorDetails.channelId?._id ? (
                    <button
                        className={`text-xs lg:text-sm text-gray-500 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 hover:text-gray-400 ${isSubscribed && 'bg-green-500 text-white hover:bg-green-600 hover:text-white'}
                        ${!isSubscribed && 'bg-white shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out -translate-x-[5px] -translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] delay-75'}`}
                        onClick={isLoggedIn ? handleSubscribe : handleRedirectToLogin}
                    >
                        <span>{isSubscribed ? <IoMdCheckmark /> : <AiOutlineUserAdd />}</span>
                        <p>{isSubscribed ? 'Subscribed' : 'Subscribe'}</p>
                    </button>
                ) : (
                    <Link href={`/dashboard/${param}`}>
                        <button
                            className='text-xs lg:text-sm text-gray-500 px-2 md:px-3 py-1 rounded-full flex items-center gap-1 hover:text-gray-400 bg-white shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]'
                        >
                            <p>Manage Videos</p>
                        </button>
                    </Link>
                )}
            </div>
        </div >
    )
}

export default ChannelHeader
