"use client"
import React from 'react'
import YoutubeLogo from '@/components/Header/YoutubeLogo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const AuthHeader = () => {
  const pathname = usePathname();

  return (
    <>
      <header className='flex gap-6 sm:gap-16 justify-between sm:justify-normal items-center pl-3 py-2 sm:py-2 w-screen bg-clip-padding blur-background border-b-[1px] border-b-primary'>
          {/* Youtube Logo */}
          <div className='ml-0 sm:ml-6'>
            <YoutubeLogo />
          </div>
          <ul className='list flex gap-5 mr-3 sm:mr-0'>
            <Link href='/'><li className='hover:text-primary'>Home</li></Link>
            <Link href={`${pathname === '/signup' ? "/login" : "/signup"}`}><li className='hover:text-primary'>{pathname === '/signup' ? "Login" : "SignUp"}</li></Link>
          </ul>
      </header>
    </>
  )
}

export default AuthHeader
