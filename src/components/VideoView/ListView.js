import Image from 'next/image'
import React from 'react'

const ListView = ({ video }) => {
    return (
        <>
            <div className='hidden sm:flex gap-3'>
                {/* thumbnail */}
                <div className='w-[40%]'>
                    <Image src={video.thumbnail} width={100} height={100} className='w-full h-full rounded-md' />
                </div >
                {/* video details */}
                <div className='w-[50%]'>
                    <h5 className='line-clamp-2 text-sm'>{video.title}</h5>
                    <div className='flex flex-col'>
                        <p className='text-neutral-400 text-xs'>{video.channel.name}</p>
                        <div className='text-neutral-400 flex text-xs'>
                            <p className='flex-shrink-0'>{video.views} views • {video.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListView
