"use client"
import React, { useState } from 'react'
import { IoMdVideocam } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import SearchForDesktop from './SearchForDesktop';
import { useHomeContext } from '@/ContextAPI/Context/HomeContext';
import SignUpBtn from '../Auth/SignUpBtn';
import ProfileCard from './ProfileCard';
import { useAuthContext } from '@/ContextAPI/Context/AuthContext';
import { useSidebarContext } from '@/ContextAPI/Context/SidebarContext';
import LogoAndHamBurgerSection from './LogoAndHamBurgerSection';

const Header = () => {
  const { toggleProfileCard } = useHomeContext();
  const { toggleSidebar } = useSidebarContext();
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <style jsx>{`
        .blur-background {
          backdrop-filter: blur(10px);
          --webkit-backdrop-filter: blur(5px);
        }
      `}</style>

      <header className='flex justify-between items-center px-3 py-2 sm:py-0 w-screen sticky top-0 bg-clip-padding blur-background'>
        {/* YouTube Logo and hamburder menu */}
        <LogoAndHamBurgerSection />

        {/* Search bar for desktop input field */}
        <SearchForDesktop />

        {
          isLoggedIn ?
            (
              <div className='flex w-28 justify-around items-center gap-1'>
                {/* Video icon */}
                <span className='cursor-pointer hover:bg-zinc-800 rounded-full p-2'>
                  <IoMdVideocam className='text-white text-xl bg-transparent' />
                </span>

                {/* Search bar icon */}
                <span className='sm:hidden mx-1 cursor-pointer hover:bg-zinc-800 rounded-full p-2'>
                  <AiOutlineSearch className='text-white text-xl bg-transparent' />
                </span>

                {/* Profile icon */}
                <span className='cursor-pointer' onClick={toggleProfileCard}>
                  <CgProfile className='text-primary/80 text-xl' />
                </span>
                <ProfileCard />
              </div>
            ) : (
              <SignUpBtn />
            )
        }

      </header >
    </>
  )
}

export default Header
