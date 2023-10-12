import React, { useState } from 'react'
import Image from 'next/image';
import ProfilePicture from '@/Images/profilePicture.jpeg';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import { useHomeContext } from '@/ContextAPI/Context/HomeContext';

const VideoGridView = ({ videoDataForView }) => {
    const { videosIndex } = useHomeContext();

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4'>
            {videoDataForView.slice(videosIndex[lowerCaseCategory], videosIndex[lowerCaseCategory] +
                (windowWidth > 1024
                    ? 4
                    : windowWidth > 768
                        ? 3
                        : windowWidth > 640
                            ? 2
                            : 1)).map((video, index) => {
                                return (
                                    <div key={index} className="w-fit">
                                        {/* video thumbnail */}
                                        <div>
                                            <Image src={video.thumbnail} className='rounded-md hover:rounded-none ease-in duration-300 w-96 sm:w-72 md:w-60' alt={video.title} width={200} height={200} />
                                        </div>

                                        {/* vidoes title and creator profile picture */}
                                        <div className='flex items-start gap-2 mt-2'>
                                            <div className="w-8 min-w-fit">
                                                <Image src={video.channel.profilePicture} className='rounded-full w-8 h-8 max-h-8' alt={video.channel.name} width={40} height={40} />
                                            </div>

                                            <div className='max-w-xs sm:max-w-xs md:max-w-[13rem] xl:max-w-[12rem]'>
                                                <h4 className='text-sm font-semibold'>{video.title}</h4>
                                                <div>
                                                    <p className='text-xs text-gray-400'>{video.channel.name}</p>
                                                    <div className="flex text-xs text-gray-400">
                                                        <p>{video.views} views</p>&nbsp;
                                                        <span>.</span>
                                                        &nbsp;<p>{video.createdAt}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
        </div>
    )
}

export default VideoGridView
