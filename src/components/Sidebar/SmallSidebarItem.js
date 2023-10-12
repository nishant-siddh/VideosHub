import Link from 'next/link'
import React from 'react'

const SmallSidebarItem = ({ Icon, title, url }) => {
    return (
        <Link href={url} className='py-4 px-1 flex flex-col items-center rounded-sm gap-1 hover:bg-zinc-800'>
            <Icon className='w-5 h-5' />
            <div className='text-xs'>{title}</div>
        </Link>
    )
}

export default SmallSidebarItem
