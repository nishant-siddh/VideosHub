import React from 'react'
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { MdUpload } from 'react-icons/md';
import UplaodLoader from '@/components/UplaodLoader';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';

const UploadVideoInterface = () => {
    const { setVideoTitle, isLoading, videoTitle } = useChannelContext();
    const { handleUploadFile } = useVideoContext();

    return (
        <>
            <div className='py-2 px-3 h-1/2 mt-16'>
                <div className='flex flex-col justify-center items-center h-full my-8'>
                    <label htmlFor="video" className='bg-zinc-900 p-5 md:p-7 rounded-full cursor-pointer'>
                        {isLoading
                            ? <UplaodLoader />
                            : <MdUpload className='text-gray-400 text-4xl md:text-5xl' />
                        }
                    </label>

                    <input
                        type="file"
                        id='video'
                        className='hidden'
                        onChange={(e) => setVideoTitle(e.target.files[0].name.split('.')[0])} />
                    <label htmlFor='video' className='text-gray-100 mt-5 cursor-pointer'>{videoTitle ? videoTitle : 'Click to upload video'}</label>


                    <button
                        disabled={isLoading || !videoTitle}
                        type='button'
                        id='uploadVideo'
                        className='bg-zinc-900 text-gray-100 px-5 py-2 rounded-md mt-5 hover:bg-gray-100 hover:text-zinc-900 transition duration-300 disabled:cursor-not-allowed disabled:opacity-50'
                        onClick={() => handleUploadFile(document.querySelector('#video').files[0])}
                    >
                        {isLoading ? 'UpisLoading' : 'Upload Video'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default UploadVideoInterface
