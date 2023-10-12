import { useSidebarContext } from '@/ContextAPI/Context/SidebarContext';
import React from 'react'
import YoutubeLogo from './YoutubeLogo';
import { GiHamburgerMenu } from 'react-icons/gi';

const LogoAndHamBurgerSection = () => {
    const { toggleSidebar } = useSidebarContext();

    return (
        <div className='w-40 flex justify-between md:justify-around items-center gap-2'>
            {/* hamburguer menu */}
            <span className='hover:bg-zinc-800 rounded-full p-2 hidden sm:block cursor-pointer' onClick={toggleSidebar} >
                <GiHamburgerMenu className='text-lg text-zinc-400 bg-transparent' />
            </span>

            {/* Youtube Logo */}
            <YoutubeLogo />
        </div>
    )
}

export default LogoAndHamBurgerSection
