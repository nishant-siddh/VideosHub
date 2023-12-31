import Link from 'next/link'
import React from 'react'
import { BsYoutube } from 'react-icons/bs'

const YoutubeLogo = ({page}) => {
  return (
    <div>
      <Link href={page === 'dashboard' ? '/dashboard' : '/'}>
        <div className='flex w-[6.5rem] jusitfy-center md:justify-evenly items-center py-2'>
          <BsYoutube className='text-primary text-xl'/>
          <h1 className='text-white tracking-[-0.01em] text-lg'>{page === 'dashboard' ? 'VH Studio' : 'VidZone'}</h1>
        </div>
      </Link>
    </div>
  )
}

export default YoutubeLogo
