"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillHome, AiFillLike, AiFillSave, AiOutlineHome, AiOutlineLike, AiOutlineSave } from 'react-icons/ai'
import { MdExplore, MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineWatchLater, MdSubscriptions, MdVideoLibrary, MdWatchLater } from 'react-icons/md'
import { FaHistory } from 'react-icons/fa'
import { RiVideoFill, RiVideoLine } from 'react-icons/ri'
import { useHomeContext } from '@/ContextAPI/Context/HomeContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SideBar = () => {
    const [selectedIcon, setSelectedIcon] = useState('');
    const [isActive, setIsActive] = useState('');
    const { isSidebarOpen } = useHomeContext();
    const router = useRouter();

    const firstHalf = [
        { label: 'Home', icon: { selected: <AiFillHome className="bg-transparent" />, unselected: <AiOutlineHome className="bg-transparent" /> }, key: 'home', linksTo: '/' },

        { label: 'Trending', icon: { selected: <MdExplore className="bg-transparent" />, unselected: <MdOutlineExplore className="bg-transparent" /> }, key: 'trending', linksTo: '/Feed/Trending' },

        { label: 'Subscription', icon: { selected: <MdSubscriptions className="bg-transparent" />, unselected: <MdOutlineSubscriptions className="bg-transparent" /> }, key: 'subscription', linksTo: '/Feed/Subscription' },

        { label: 'Library', icon: { selected: <MdVideoLibrary className="bg-transparent" />, unselected: <MdOutlineVideoLibrary className="bg-transparent" /> }, key: 'library', linksTo: '/Feed/Library' },

        { label: 'History', icon: { selected: <FaHistory className="bg-transparent" />, unselected: <FaHistory className="bg-transparent" /> }, key: 'history', linksTo: '/Feed/History' },

        { label: 'Your Videos', icon: { selected: <RiVideoFill className="bg-transparent" />, unselected: <RiVideoLine className="bg-transparent" /> }, key: 'your-videos', linksTo: '/channel' },

        { label: 'Watch Later', icon: { selected: <MdWatchLater className="bg-transparent" />, unselected: <MdOutlineWatchLater className="bg-transparent" /> }, key: 'watch-later', linksTo: '/Playlist/WatchLater' },

        { label: 'Liked Videos', icon: { selected: <AiFillLike className="bg-transparent" />, unselected: <AiOutlineLike className="bg-transparent" /> }, key: 'liked', linksTo: '/Playlist/LikedVideos' },

        { label: 'Saved Videos', icon: { selected: <AiFillSave className="bg-transparent" />, unselected: <AiOutlineSave className="bg-transparent" /> }, key: 'saved', linksTo: '/Playlist/SavedVideos' },
    ]

    const handleClick = async () => {
        const response = await axios.get('/api/channel/channelTokenId')
        router.push(`/channel/${response.data}`)
    }

    return (
        <>
            <aside className={`hidden sm:${isSidebarOpen && 'block'} sm:w-64 xl:w-52 h-screen`}>
                <div className="text-white sm:text-[0.7rem] md:text-xs px-3 py-2 !fixed top-12">
                    {/* Sidebar content goes here */}
                    {
                        firstHalf.map((link, index) => {
                            return (
                                <Link key={index} href='#' className='flex' onClick={() => setSelectedIcon(link.key)}>
                                    <div className={`${isSidebarOpen && 'flex items-center'} px-3 py-2 hover:bg-zinc-800 hover:border-b-[1px] hover:border-b-primary rounded-lg w-full ${isActive === link.label && 'bg-zinc-700 border-b-[1px] border-b-primary'}`} onClick={() => setIsActive(link.label)} >
                                        <div className='mr-4 md:mr-6 sm:text-sm md:text-lg'>
                                            {selectedIcon === link.key
                                                ? link.icon.selected
                                                : link.icon.unselected
                                            }
                                        </div>
                                        <div className='bg-transparent pr-8'>
                                            {link.label}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })

                    }
                    <div className='cursor-pointer' onClick={handleClick}>Your channel</div>
                </div>
            </aside>
        </>
    )
}

export default SideBar
