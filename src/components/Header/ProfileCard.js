"use client";
import { useAuthContext } from '@/ContextAPI/Context/AuthContext';
import { useHomeContext } from '@/ContextAPI/Context/HomeContext'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const ProfileCard = () => {
  const router = useRouter();
  const {setIsLoggedIn} = useAuthContext();
  const { profileCard } = useHomeContext();

  const handleLogout = async () => {
    await axios.put('/api/users/logout');
    setIsLoggedIn(false);
    router.refresh();
  }

  return (
    <div className={`${profileCard ? 'block' : 'hidden'} text-white bg-red-400 cursor-pointer`} onClick={handleLogout}>
      Log out
    </div>
  )
}

export default ProfileCard