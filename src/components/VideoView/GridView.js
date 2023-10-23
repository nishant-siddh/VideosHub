import Image from 'next/image'
import React from 'react'

const GridView = ({ video }) => {
    return (
        <div className="sm:hidden flex flex-col">
            {/* video thumbnail */}
            <div>
                <Image src={video.thumbnail} className='rounded-md hover:rounded-none ease-in duration-300 w-full' alt='{video.title}' width={100} height={100} />
            </div>

            {/* vidoes title and creator profile picture */}
            <div className='flex items-start gap-2 mt-2'>
                <div className="flex-shrink-0">
                    <Image src={video.thumbnail} className='rounded-full w-10 h-10 max-h-10' alt='{video.channel.name}' width={40} height={40} />
                </div>

                <div className='w-full'>
                    <h4 className='text-sm font-semibold line-clamp-2'>{video.title}</h4>
                    <div>
                        <p className='text-xs text-gray-400'>{video.channel.name}</p>
                        <div className="flex text-xs text-gray-400">
                            <p>{video.views} views • {video.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GridView
