import { useTimeAndDateContext } from '@/ContextAPI/Context/TimeAndDateContext';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const GridView = ({ video, param }) => {
    const { formatTimeAgo } = useTimeAndDateContext();
    const videoCreatedAt = new Date(video.createdAt);
    return (
        // sm:hidden
        <Link href={`/watch?v=${video._id}`}>
            <div className="flex flex-col">
                {/* video thumbnail */}
                <div>
                    <Image src={video.thumbnailUrl} className='rounded-md hover:rounded-none ease-in duration-300 w-full h-[12.5rem]' alt='{video.title}' width={100} height={100} />
                </div>

                {/* vidoes title and creator profile picture */}
                <div className='flex items-start gap-2 mt-2'>
                    {!param && <div className="flex-shrink-0">
                        <Image src={video.thumbnailUrl} className='rounded-full w-10 h-10 max-h-10' alt='{video.channel.name}' width={40} height={40} />
                    </div>}

                    <div className='w-full'>
                        <h4 className='text-sm font-semibold line-clamp-2'>{video.title}</h4>
                        <div>
                            {/* <p className='text-xs text-gray-400'>{video.channel.name}</p> */}
                            <div className="flex text-xs text-gray-400">
                                <p><span>{video.meta && video.meta.views}</span> views • <span>{formatTimeAgo(videoCreatedAt)}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GridView
