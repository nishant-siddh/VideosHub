import React from 'react'
import UploadVideoDetailsFrom from './UploadVideoDetailsFrom';
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';

const UploadVideoInterface = () => {
    const { setVideoTitle, handleUploadVideo, loading, videoTitle, isVideoUploaded } = useChannelContext();

    return (
        <>
            {
                !isVideoUploaded
                    ? (
                        loading
                            ? 'Uploading'
                            : (
                                <div>
                                    <label htmlFor="video">Select Video</label>
                                    <input
                                        type="file"
                                        id='video'
                                        className='hidden'
                                        onChange={(e) => setVideoTitle(e.target.files[0].name.split('.')[0])} />
                                    <p>{videoTitle}</p>
                                    <button type='button' id='uploadVideo' onClick={() => handleUploadVideo(document.querySelector('#video').files[0])}>Upload Files</button>
                                </div>
                            )
                    ) : (<UploadVideoDetailsFrom />)
            }

            <button data-close-modal onClick={() => document.querySelector('[data-modal]').close()}>Close</button>
        </>
    )
}

export default UploadVideoInterface
