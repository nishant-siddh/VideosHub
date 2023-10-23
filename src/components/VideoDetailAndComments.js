import { useChannelContext } from '@/ContextAPI/Context/ChannelContext'
import React, { useEffect, useState } from 'react'
import profileImage from '@/Images/profilePicture.jpeg'
import Image from 'next/image';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike, AiOutlineUserAdd } from 'react-icons/ai'
import { FaFolderPlus } from 'react-icons/fa'

const VideoDetailAndComments = ({ videoDataForView }) => {
    const { userDetail, channelDetail } = useChannelContext();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    return (
        <div>
            <h5 className='my-3'>{videoDataForView.title}</h5>

            <div className='flex flex-wrap gap-3 justify-between'>
                <div className='flex items-start gap-2'>
                    <div className='flex-shrink-0 w-fit '>
                        <Image src={profileImage} width={20} height={20} className='w-8 rounded-full' alt="" />
                    </div>
                    <div className='flex sm:justify-between items-center gap-3 sm:w-fit w-full sm:flex-shrink-0'>
                        <div className='flex flex-col'>
                            <h6>{userDetail.name}</h6>
                            <span className='text-xs text-gray-500'>{channelDetail.totalSubscribers} subscribers</span>
                        </div>
                        <button className='text-xs lg:text-sm text-gray-500 px-2 md:px-3 py-1 rounded-full bg-white hover:text-gray-400 flex items-center gap-1 shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto'><AiOutlineUserAdd />Subscribe</button>
                    </div>
                </div>
                {/* likes dislikes and save button */}
                <div className='flex gap-1 md:gap-3 justify-between md:justify-end sm:flex-shrink-0 items-center text-xs w-full sm:w-fit lg:text-sm'>
                    <div className='flex rounded-full border'>
                        <button className='px-2 md:px-3 py-1 border-r-2 flex gap-1 items-center'>{liked ? <AiFillLike /> : <AiOutlineLike />} Like</button>
                        <button className='px-2 md:px-3 py-1 flex gap-1 items-center'>{disliked ? <AiFillDislike /> : <AiOutlineDislike />} Dislike</button>
                    </div>
                    <button className='border px-2 md:px-3 py-1 rounded-full flex items-center gap-1'><FaFolderPlus /> Save</button>
                </div>
            </div>

            {/* comments section */}
            <div className='mt-5'>
                <h5 className='mb-3'>Comments</h5>
                <div className='flex gap-3'>
                    <div className='flex-shrink-0 w-fit '>
                        <Image src={profileImage} width={20} height={20} className='w-12 rounded-full' alt="" />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <textarea className='w-full p-2 rounded-md bg-transparent border-b-2' placeholder='Add a public comment...'></textarea>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-2'>
                                <input type="checkbox" />
                                <span>Notify me</span>
                            </div>
                            <button className='bg-primary px-3 py-1 rounded-md text-white'>Comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoDetailAndComments
