import React from 'react'
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import ProfilePicture from './ProfilePicture';

const ChannelHeader = () => {
    const {userDetail, channelDetail} = useChannelContext();

    return (
        <div className='w-full flex flex-col sm:flex-row items-center gap-3'>
            <ProfilePicture />

            {/* channel details and subscribe button */}
            <div className='w-4/5 flex flex-col sm:flex-row items-center justify-between gap-2'>
                <div className='flex flex-col items-center sm:items-start text-zinc-400'>
                    {/* creator name */}
                    <div className='text-white tracking-wider'>
                        <h1 className='text-xl sm:text-2xl'>{userDetail.name}</h1>
                    </div>

                    {/* username and subscribers count and videos count */}
                    <div className='flex flex-wrap justify-center text-xs sm:text-sm gap-1'>
                        <p>@{`${channelDetail.username}`.toLowerCase()}</p>
                        <p>{channelDetail.totalSubscribers} Subscribers</p>
                        <p>805 videos</p>
                    </div>

                    {/* channel description */}
                    <p1 className='text-xs sm:text-sm mt-1'>{channelDetail.channelDescription}</p1>
                </div>

                {/* subscribe button */}
                <button className='bg-primary hover:bg-primary/80 text-white text-xs md:text-sm rounded-lg px-2 py-1' >Subscribe</button>
            </div>
        </div>
    )
}

export default ChannelHeader
