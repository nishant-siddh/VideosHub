import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { useTimeAndDateContext } from '@/ContextAPI/Context/TimeAndDateContext';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RiMore2Fill } from "react-icons/ri";

const GridView = ({ video, param }) => {
    const { formatTimeAgo } = useTimeAndDateContext();
    const { handleGetCreatorDetails, videoCreatorDetails } = useChannelContext();
    const [isHovered, setIsHovered] = useState(false);
    const videoCreatedAt = new Date(video.createdAt);
    const [videoCreatorName, setVideoCreatorName] = useState('')

    // console.log(video.title, 'inside grid view');

    // const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
    // const dialog = document.querySelector("dialog")

    // function handleOpenDialog(e) {
    //     e.preventDefault();
    //     const rect = e.currentTarget.getBoundingClientRect();
    //     setDialogPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    //     dialog.show();
    //     setIsHovered(true);
    // }

    // function handleCloseDialog(e) {
    //     e.preventDefault();
    //     dialog.close()
    // }
    
    useEffect(() => {
        console.log(videoCreatorDetails, 'video creator details');
        console.log(video.uploadedBy, 'this is creator username');
        if (videoCreatorDetails?.channelId?.username !== video.uploadedBy) {
            (
                async () => {
                    const data = await handleGetCreatorDetails(video.uploadedBy, 'username')
                    console.log(data, 'data');
                    setVideoCreatorName(data);
                }
            )()
        }
    }, [])

    console.log(videoCreatorDetails, 'video creator details');

    return (
        <Link href={`/watch?v=${video._id}`} onClick={() => console.log(videoCreatorDetails, videoCreatorName)}>
            <div className="flex flex-col z-10 bg-zinc-900 rounded-md px-1 pt-1 pb-2 hover:scale-105 hover:shadow-sm shadow-white transition-all delay-100 duration-100">
                {/* video thumbnail */}
                <div>
                    <Image src={video.thumbnailUrl} className='rounded-md hover:rounded-none ease-in duration-300 w-full sm:h-[12.5rem]' alt='{video.title}' width={100} height={100} />
                </div>

                {/* vidoes title and creator profile picture */}
                <div className='flex items-start gap-2 mt-2'>
                    {!param && <div className="flex-shrink-0">
                        <Image src={video.thumbnailUrl} className='rounded-full w-10 h-10 max-h-10' alt='video channel name' width={40} height={40} />
                    </div>}

                    <div className='w-full flex justify-between' onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <div>
                            <h4 className='text-sm font-semibold line-clamp-2'>{video.title}</h4>
                            <div>
                                <div className="flex flex-col text-xs text-gray-400">
                                    {!param && <Link href={`/@${videoCreatorDetails?.channelId?.username}`}><p className='hover:text-white w-fit'>{videoCreatorName}</p></Link>}
                                    <p><span>{video.meta && video.meta.views}</span> views • <span>{() => formatTimeAgo(videoCreatedAt)}</span></p>
                                </div>
                            </div>
                        </div>
                        <div>
                            {isHovered && <div className='hover:bg-zinc-800 rounded-full w-7 h-7 flex justify-center items-center'>
                                <RiMore2Fill />
                            </div>}

                            {/* <dialog className='absolute z-50 bg-red-100' style={{ top: dialogPosition.top, left: dialogPosition.left }}>
                                <span>You can see me</span>
                                <button onClick={handleCloseDialog}>Close</button>
                            </dialog> */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GridView
