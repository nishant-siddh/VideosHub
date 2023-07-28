import React from 'react'
import profilePicture from '@/Images/profile.jpg';
import Image from 'next/image';

const ProfilePicture = () => {
    return (
        <div className='w-16 sm:w-28 min-w-fit'>
            <Image src={profilePicture} className='rounded-full w-16 h-16 max-h-16 sm:w-28 sm:h-28 sm:max-h-28' width={100} height={100} alt='profile image' />
        </div>
    )
}

export default ProfilePicture
