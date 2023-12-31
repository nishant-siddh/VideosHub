import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { useTimeAndDateContext } from '@/ContextAPI/Context/TimeAndDateContext';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import Image from 'next/image'
import React from 'react'

const VideoOnEditPage = () => {
    const { videoDataForView, videoDetails } = useVideoContext();
    const { formatDate } = useTimeAndDateContext();
    const { formikValues } = useChannelContext();
    const { meta, createdAt } = videoDataForView;
    const { title } = formikValues;
    return (
        <div className='flex justify-center mx-4'>
            <div className="w-fit mx-0">
                {/* videoDataForView thumbnail */}
                {videoDetails.thumbnailUrl && <div>
                    <Image src={videoDetails.thumbnailUrl} className='rounded-md hover:rounded-none ease-in duration-300 w-52 md:w-56 lg:w-64' alt={title} width={100} height={100} />
                </div>}

                {/* vidoes title and creator profile picture */}
                <div className='flex items-start gap-2 mt-2'>
                    {videoDetails.thumbnailUrl && <div className="w-8 min-w-fit">
                        <Image src={videoDetails.thumbnailUrl} className='rounded-full w-8 h-8 max-h-8' alt={title} width={40} height={40} />
                    </div>}
                    <div className='max-w-xs sm:max-w-xs md:max-w-[13rem] xl:max-w-[12rem]'>
                        <h4 className='text-sm font-semibold'>{title}</h4>
                        <div>
                            <div className="flex text-xs text-gray-400">
                                <p>{meta.views} views</p>&nbsp;
                                <span>.</span>
                                &nbsp;<p>{formatDate(createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoOnEditPage
