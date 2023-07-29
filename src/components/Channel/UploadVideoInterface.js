import React, { useState } from 'react'
import UploadVideoDetailsFrom from './UploadVideoDetailsFrom';
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { RxCross1 } from 'react-icons/rx';
import { MdUpload } from 'react-icons/md';
import UplaodLoader from '../UplaodLoader';

const UploadVideoInterface = () => {
    const { setVideoTitle, handleUploadVideo, loading, videoTitle, isVideoUploaded } = useChannelContext();
    const [temporaryVideoURL, setTemporaryVideoURL] = useState('');

    const handleVideoUrl = (e) => {
        const file = e.target.files[0];
        setVideoTitle(file.name);
        setTemporaryVideoURL(URL.createObjectURL(file));
    }

    return (
        <>
            {/* dialog box upper part */}
            <div className='fixed flex justify-between items-center rounded-t-md py-1 px-3 border-b w-10/12 sm:w-[70%] md:w-[60%] bg-zinc-800 z-50'>
                <h1 className='text-lg text-gray-100 py-2 relative'>
                    Upload Video
                </h1>

                <button
                    data-close-modal
                    className='p-2 text-gray-400 rounded-md hover:text-gray-100 transition duration-300 outline-none focus:outline-none'
                    onClick={() => document.querySelector('[data-modal]').close()}
                >
                    <RxCross1 />
                </button>
            </div>
            {/* <hr className='w-full border-gray-400 mt-12' /> */}


            <div className='py-2 px-3 h-1/2 mt-16'>
                {!isVideoUploaded
                    ? (
                        <div className='flex flex-col justify-center items-center h-full my-8'>
                            <label htmlFor="video" className='bg-zinc-900 p-5 md:p-7 rounded-full cursor-pointer'>
                                {loading
                                    ? <UplaodLoader />
                                    : <MdUpload className='text-gray-400 text-4xl md:text-5xl' />
                                }
                            </label>

                            <input
                                type="file"
                                id='video'
                                className='hidden'
                                onChange={handleVideoUrl} />
                            <label htmlFor='video' className='text-gray-100 mt-5 cursor-pointer'>{videoTitle ? videoTitle : 'Click to upload video'}</label>


                            <button
                                disabled={loading || !videoTitle}
                                type='button'
                                id='uploadVideo'
                                className='bg-zinc-900 text-gray-100 px-5 py-2 rounded-md mt-5 hover:bg-gray-100 hover:text-zinc-900 transition duration-300 disabled:cursor-not-allowed disabled:opacity-50'
                                onClick={() => handleUploadVideo(document.querySelector('#video').files[0])}
                            >
                                Upload Files
                            </button>
                        </div>
                    ) : (<UploadVideoDetailsFrom temporaryVideoURL={temporaryVideoURL} />)
                }
            </div>


        </>
    )
}

export default UploadVideoInterface
