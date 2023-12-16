import Link from 'next/link'
import React from 'react'

const LargeSidebarItems = ({ isActive = false, IconOrImageUrl, title, url }) => {
    return (
        <Link href={url} className={`w-full flex items-center rounded-lg gap-4 p-3 hover:bg-zinc-800 ${isActive ? 'font-bold bg-zinc-900' : undefined}`}>

            {typeof IconOrImageUrl === 'string' ? (
                IconOrImageUrl.length > 0 ? (
                    <img src={IconOrImageUrl} className='w-7 h-7 rounded-full' alt='image' />
                ) : (
                    <div className='w-7 h-7 flex justify-center items-center bg-red-500 rounded-full text-white'>
                        {title[0].toUpperCase()}
                    </div>
                )
            ) : (
                <IconOrImageUrl className='w-5 h-5' />
            )}
            <div className='whitespace-nowrap overflow-hidden text-sm text-ellipsis'>
                {title}
            </div>
        </Link>
    )
}

export default LargeSidebarItems
