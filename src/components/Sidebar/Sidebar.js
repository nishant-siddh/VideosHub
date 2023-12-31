"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillHome, AiFillLike, AiFillSave, AiOutlineHome, AiOutlineLike, AiOutlineSave } from 'react-icons/ai'
import { MdExplore, MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineWatchLater, MdSubscriptions, MdVideoLibrary, MdWatchLater } from 'react-icons/md'
import { FaHistory } from 'react-icons/fa'
import { FaRegCircleUser } from "react-icons/fa6";
import { RiVideoFill, RiVideoLine } from 'react-icons/ri'
import { useHomeContext } from '@/ContextAPI/Context/HomeContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import SmallSidebarItem from './SmallSidebarItem'
import LargeSidebarSection from './LargeSidebarSection'
import LargeSidebarItems from './LargeSidebarItems'
import { useSidebarContext } from '@/ContextAPI/Context/SidebarContext'
import LogoAndHamBurgerSection from '../Header/LogoAndHamBurgerSection'
import { useSubscriptionContext } from '@/ContextAPI/Context/SubscriptionContext'

const SideBar = () => {
    const [selectedIcon, setSelectedIcon] = useState('');
    const [isActive, setIsActive] = useState('');
    const [channelId, setChannelId] = useState('');
    const { isLargeOpen, isSmallOpen, closeSidebar } = useSidebarContext();
    const router = useRouter();
    const { allSubscribedChannelsByUser } = useSubscriptionContext();

    useEffect(() => {
        (async () => {
            const response = await axios.get('/api/channel/channelTokenId')
            setChannelId(response.data)
        })()
    }, [])

    return (
        <>
            <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 hidden sm:flex flex-col ml-1 ${isLargeOpen ? 'lg:hidden' : 'lg:flex'}`}>
                <SmallSidebarItem Icon={AiFillHome} title="Home" url='/' />
                <SmallSidebarItem Icon={MdExplore} title="Trending" url='/' />
                <SmallSidebarItem Icon={MdSubscriptions} title="Subscription" url='/' />
                <SmallSidebarItem Icon={MdVideoLibrary} title="Library" url='/' />
            </aside>

            {isSmallOpen && (
                <div
                    onClick={closeSidebar} className='lg:hidden fixed inset-0 z-[999] bg-zinc-800 opacity-50'
                />
            )}

            <aside className={`w-52 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-2 flex-col gap-2 ${isLargeOpen ? 'lg:flex' : 'lg:hidden'} ${isSmallOpen ? 'flex z-[999] bg-zinc-900 h-screen' : 'hidden'}`}>

                <div className='lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-zinc-900'>
                    <LogoAndHamBurgerSection />
                </div>

                <LargeSidebarSection>
                    <LargeSidebarItems isActive IconOrImageUrl={AiFillHome} title="Home" url='/' />
                    <LargeSidebarItems IconOrImageUrl={MdSubscriptions} title="Subscriptions" url='/' />
                </LargeSidebarSection>

                <hr className='border-spacing-1 border-zinc-400' />

                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItems IconOrImageUrl={FaRegCircleUser} title="Your Channel" url={`/channel/${channelId}`} />
                    <LargeSidebarItems IconOrImageUrl={MdVideoLibrary} title="Library" url='/' />
                    <LargeSidebarItems IconOrImageUrl={FaHistory} title="History" url='/' />
                    <LargeSidebarItems IconOrImageUrl={RiVideoFill} title="Your Videos" url={`/dashboard/${channelId}`} />
                    <LargeSidebarItems IconOrImageUrl={AiFillSave} title="Saved Videos" url='/' />
                    <LargeSidebarItems IconOrImageUrl={MdExplore} title="Trending" url='/' />
                    <LargeSidebarItems IconOrImageUrl={MdWatchLater} title="Watch Later" url='/' />
                    <LargeSidebarItems IconOrImageUrl={AiFillLike} title="Liked Videos" url='/' />
                </LargeSidebarSection>

                <hr className='border-spacing-1 border-zinc-400' />

                <LargeSidebarSection title='Subscriptions' visibleItemCount={6}>
                    {allSubscribedChannelsByUser.map(subscription => (
                        <LargeSidebarItems
                            key={subscription._id}
                            IconOrImageUrl={subscription.channelId.profilePicture}
                            title={subscription.name}
                            url={`/@${subscription.channelId.username}`}
                        />
                    ))}
                </LargeSidebarSection>
            </aside>
        </>
    )
}
export default SideBar
