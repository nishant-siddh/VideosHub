"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillHome, AiFillLike, AiFillSave, AiOutlineHome, AiOutlineLike, AiOutlineSave } from 'react-icons/ai'
import { MdExplore, MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineWatchLater, MdSubscriptions, MdVideoLibrary, MdWatchLater } from 'react-icons/md'
import { FaHistory } from 'react-icons/fa'
import { RiVideoFill, RiVideoLine } from 'react-icons/ri'
import { useHomeContext } from '@/ContextAPI/Context/HomeContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import SmallSidebarItem from './SmallSidebarItem'
import LargeSidebarSection from './LargeSidebarSection'
import LargeSidebarItems from './LargeSidebarItems'
import { useSidebarContext } from '@/ContextAPI/Context/SidebarContext'
import LogoAndHamBurgerSection from '../Header/LogoAndHamBurgerSection'

const SideBar = () => {
    const [selectedIcon, setSelectedIcon] = useState('');
    const [isActive, setIsActive] = useState('');
    const [channelId, setChannelId] = useState('');
    const { isLargeOpen, isSmallOpen, closeSidebar } = useSidebarContext();
    const router = useRouter();

    const subscriptions = [
        {
            id: 1,
            channelName: 'Fireship',
            imageUrl: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
            username: 'fireship'
        },
        {
            id: 2,
            channelName: 'Code with harry',
            imageUrl: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
            username: 'codeWithHarry'
        },
        {
            id: 3,
            channelName: 'Kevin Powell',
            imageUrl: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
            username: 'kevinPowell'
        },
        {
            id: 4,
            channelName: 'Web dev simplified',
            imageUrl: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
            username: 'webDevSimplified'
        },
        {
            id: 5,
            channelName: 'Web development',
            imageUrl: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
            username: 'webDevelopment'
        },
        {
            id: 6,
            channelName: 'Web development',
            imageUrl: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
            username: 'webDevelopment'
        },
        {
            id: 7,
            channelName: 'Web development',
            imageUrl: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
            username: 'webDevelopment'
        },
        {
            id: 8,
            channelName: 'Web development',
            imageUrl: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
            username: 'webDevelopment'
        },
        {
            id: 9,
            channelName: 'Web development',
            imageUrl: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
            username: 'webDevelopment'
        },
        {
            id: 10,
            channelName: 'Web development',
            imageUrl: 'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
            username: 'webDevelopment'
        },
    ];

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/api/channel/channelTokenId')
                setChannelId(response.data)
            } catch (error) {
                console.log(error, 'error in getting channel token id');
                router.push('/login')
            }
        })()
    }, [])

    return (
        <>
            <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? 'lg:hidden' : 'lg:flex'}`}>
                <SmallSidebarItem Icon={AiFillHome} title="Home" url='/' />
                <SmallSidebarItem Icon={MdExplore} title="Trending" url='/' />
                <SmallSidebarItem Icon={MdSubscriptions} title="Subscription" url='/' />
                <SmallSidebarItem Icon={MdVideoLibrary} title="Library" url='/' />
                {/* <div className="text-white sm:text-[0.7rem] md:text-xs px-3 py-2">
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
                    <div className='cursor-pointer border mb-4' id='channel' onClick={handleClick}>Your channel</div>
                    <div className='cursor-pointer border' id='dashboard' onClick={handleClick}>Dashboard</div>
                </div> */}
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

                <LargeSidebarSection visibleItemCount={4}>
                    <LargeSidebarItems IconOrImageUrl={MdVideoLibrary} title="Library" url='/' />
                    <LargeSidebarItems IconOrImageUrl={FaHistory} title="History" url='/' />
                    <LargeSidebarItems IconOrImageUrl={MdExplore} title="Trending" url='/' />
                    <LargeSidebarItems IconOrImageUrl={MdWatchLater} title="Watch Later" url='/' />
                    <LargeSidebarItems IconOrImageUrl={RiVideoFill} title="Your Videos" url={`/dashboard/${channelId}`} />
                    <LargeSidebarItems IconOrImageUrl={AiFillLike} title="Liked Videos" url='/' />
                    <LargeSidebarItems IconOrImageUrl={AiFillSave} title="Saved Videos" url='/' />
                </LargeSidebarSection>

                <hr className='border-spacing-1 border-zinc-400' />

                <LargeSidebarSection title='Subscriptions' visibleItemCount={6}>
                    {subscriptions.map(subscription => (
                        <LargeSidebarItems
                            key={subscription.id}
                            IconOrImageUrl={subscription.imageUrl}
                            title={subscription.channelName}
                            url={`/@${subscription.username}`}
                        />
                    ))}
                </LargeSidebarSection>
            </aside>
        </>
    )
}
export default SideBar
