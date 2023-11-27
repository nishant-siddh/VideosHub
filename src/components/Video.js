import Image from 'next/image'
import React from 'react'

const Video = ({ video }) => {
    const { thumbnail, title, channel, views, createdAt } = video;

    return (
        <div className="flex flex-col">
            {/* video thumbnail */}
            <div>
                <Image src={thumbnail} className='rounded-md hover:rounded-none ease-in duration-300 w-full' alt='{title}' width={200} height={200} />
            </div>

            {/* vidoes title and creator profile picture */}
            <div className='flex items-start gap-2 mt-2'>
                <div className="w-8 min-w-fit">
                    <Image src={thumbnail} className='rounded-full w-10 h-10 max-h-10' alt='{channel.name}' width={40} height={40} />
                </div>

                <div className='max-w-xs sm:max-w-xs'>
                    <h4 className='text-sm font-semibold'>{title}</h4>
                    <div>
                        <p className='text-xs text-gray-400'>{channel.name}</p>
                        <div className="flex text-xs text-gray-400">
                            <p>{views} views • {createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video