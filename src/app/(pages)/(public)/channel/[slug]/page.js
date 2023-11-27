"use client"
import React, { useState, useEffect } from 'react';
import UploadBtn from '@/components/Channel/UploadBtn';
import ChannelDetailSection from '@/components/Channel/ChannelDetailSection';
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import UploadVideoDialogBox from '@/components/Channel/DialogBox/UploadVideoDialogBox';
import axios from 'axios';
import Image from 'next/image';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';

const ChannelPage = ({ params }) => {
  const param = params.slug;
  const { channelDetail, userDetail, getChannelAndUserDetails, isLoading } = useChannelContext()
  const [windowWidth, setWindowWidth] = useState(0);
  const [modal, setModal] = useState();
  const { getVideoDataForView, channelVideos } = useVideoContext();
  const [videos, setVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  // change window width on resize
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setModal(document.querySelector('[data-modal]'));
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // getting the user and the user's channel data
  useEffect(() => {
    (async () => {
      if (!userDetail && !channelDetail) {
        await getChannelAndUserDetails();
      }
    })()
  }, []);

  useEffect(() => {
    if (channelDetail.username) {
      getVideoDataForView(channelDetail.username, 'username');

    }
  }, [channelDetail]);


  return (
    <main className='mt-4 mx-auto px-5 w-full'>
      {/* channel header section  */}
      <ChannelDetailSection />

      <hr className='my-4 bg-red-400' />

      {/* channel videos section */}
      <div>
        {channelVideos.length === 0 && (
          <>
            <UploadBtn modal={modal} />
            <UploadVideoDialogBox />
          </>
        )}

        {
          isLoading
            ? <p>Loading...</p>
            : <div className="grid grid-cols-3 gap-4">
              {channelVideos && channelVideos.map((video) => (
                <div key={video.$id} className="w-fit h-fit border cursor-pointer" onClick={() => handleGetVideoView(video.$id)}>
                  <Image src={video.thumbnail} width={300} alt="image" />
                  <p>{video.name}</p>
                </div>
              ))}
            </div>
        }

        {/* {videoUrl && (
          <video src={videoUrl} width="320" height="240" controls autoPlay>
            Your browser does not support the video tag.
          </video>
        )} */}

      </div>
    </main>
  )
}

export default ChannelPage
