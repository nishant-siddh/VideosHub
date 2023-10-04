import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import React, { useRef, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import UploadVideoDetailsForm from './UploadVideoDetailsForm';
import UploadVideoInterface from './UploadVideoInterface';
import axios from 'axios';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';

const UploadVideoDialogBox = () => {
  const { setVideoTitle, formikValues, loading } = useChannelContext();
  const {isVideoUploaded, setIsVideoUploaded, videoDetails, setVideoDetails } = useVideoContext();
  const [savingVideo, setSavingVideo] = useState(false);
  const dialogRef = useRef();

  const handleDialogClose = async () => {
    dialogRef.current.close();
    setVideoTitle('');
    setIsVideoUploaded(false);
    if (isVideoUploaded) {
      const draftRes = await axios.post('/api/videos/addVideos', { values: formikValues, videoDetails });
      console.log(draftRes.data, 'this is draft res');
    }

    setVideoDetails('', 'thumbnailId');
    setVideoDetails('', 'thumbnailUrl');
  }

  return (
    <div>
      <dialog data-modal ref={dialogRef} className='w-10/12 sm:w-[70%] md:w-[60%] h-4/5 bg-zinc-800 p-0 rounded-md'>
        {/* dialog box upper part */}
        <div className='fixed flex justify-between items-center rounded-t-md py-1 px-3 border-b w-10/12 sm:w-[70%] md:w-[60%] bg-zinc-800 z-50'>
          <h1 className='text-lg text-gray-100 py-2 relative'>
            Upload Video
          </h1>

          <button
            data-close-modal
            className='p-2 text-gray-400 rounded-md hover:text-gray-100 transition duration-300 outline-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleDialogClose}
            disabled={savingVideo || loading}
          >
            <RxCross1 />
          </button>
        </div>
        {/* <hr className='w-full border-gray-400 mt-12' /> */}

        {
          !isVideoUploaded
            ? <UploadVideoInterface />
            : <UploadVideoDetailsForm savingVideo={savingVideo} setSavingVideo={setSavingVideo} />
        }

      </dialog>
    </div>
  )
}

export default UploadVideoDialogBox
