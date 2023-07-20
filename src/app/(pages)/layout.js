"use client";
import '../globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import SideBar from '@/components/Sidebar'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react';
import { useAuthContext } from '@/ContextAPI/Context/AuthContext';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'VideosHub',
  description: 'Generated by create next app',
}

export default function PagesLayout({ children }) {
  const pathname = usePathname();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  useEffect(() => {
    (async () => {
      const hasToken = await axios.get('/api/users/isLoggedIn');
      if (hasToken.data.hasToken !== undefined) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    })()
  }, [])

  return (
    <>
      <div>
        {(pathname !== '/signup' && pathname !== '/login' && pathname !== '/verifyEmail') && <Header />}
        <div className='flex text-white'>
          {(pathname !== '/signup' && pathname !== '/login' && pathname !== '/verifyEmail') && <SideBar />}
          {children}
        </div>
      </div>
    </>
  )
}
