"use client";
import React, { useEffect, useState } from 'react'
import YoutubeLogo from '../Header/YoutubeLogo'
import UploadBtn from '../Channel/UploadBtn'
import UploadVideoDialogBox from '../Channel/DialogBox/UploadVideoDialogBox'
import { GiHamburgerMenu } from 'react-icons/gi';
import { useHomeContext } from '@/ContextAPI/Context/HomeContext';

const DashboardHeader = () => {
  const [modal, setModal] = useState();
  const { toggleSidebar } = useHomeContext();

  useEffect(() => {
    setModal(document.querySelector('[data-modal]'));
  }, [])

  return (
    <header className='flex gap-6 sm:gap-16 justify-between sm:justify-normal items-center pl-3 py-2 sm:py-2 w-screen fixed z-50 bg-clip-padding blur-background border-b-[1px] border-b-primary'>
    {/* YouTube studio Logo and hamburder menu */}
      <div className='w-40 flex justify-between md:justify-around items-center gap-2'>
        {/* hamburguer menu */}
        <span className='hover:bg-zinc-800 rounded-full p-2 hidden sm:block cursor-pointer' onClick={toggleSidebar} >
          <GiHamburgerMenu className='text-lg text-zinc-400 bg-transparent' />
        </span>

        {/* Youtube Logo */}
        <YoutubeLogo page={'dashboard'} />
      </div>
      <ul className='list flex gap-5 mr-3 sm:mr-0'>
        <UploadBtn modal={modal} />
        <UploadVideoDialogBox />
      </ul>
    </header>
  )
}

export default DashboardHeader
