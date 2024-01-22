"use client"
import React, { useState, useEffect } from 'react';
import UploadBtn from '@/components/Channel/UploadBtn';
import ChannelDetailSection from '@/components/Channel/ChannelDetailSection';
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import GridView from '@/components/ChannelPageVideoView/GridView';
import Link from 'next/link';

const ChannelPageUsingUsername = ({ params }) => {
  const param = params.username;
  console.log(param, 'param');
//   const { channelDetail, userDetail, getChannelAndUserDetails, isLoading, handleGetCreatorDetails, videoCreatorDetails } = useChannelContext()
//   const [windowWidth, setWindowWidth] = useState(0);
//   const { getVideoDataForView, channelVideos } = useVideoContext();

//   // change window width on resize
//   useEffect(() => {
//     setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);

//     // Clean up the event listener on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const handleResize = () => {
//     setWindowWidth(window.innerWidth);
//   };

//   // getting the user and the user's channel data
//   useEffect(() => {
//     (async () => {
//       if (!userDetail && !channelDetail) {
//         await getChannelAndUserDetails();
//       }
//     })()
//   }, []);

//   useEffect(() => {
//     if (param) {
//       console.log(param, 'param');
//       handleGetCreatorDetails(param, 'id');
//     }
//   }, [param])

//   useEffect(() => {
//     if (videoCreatorDetails?.channelId?.username) {
//       getVideoDataForView(videoCreatorDetails?.channelId?.username, 'username');
//     }
//   }, [videoCreatorDetails.channelId]);


  return (
    <main className='mt-4 mx-auto w-full overflow-x-hidden px-5 pb-4'>
      {/* channel header section  */}
      {/* <ChannelDetailSection param={param} />

      <hr className='my-4 bg-red-400' />

      <div>
        {
          isLoading
            ? <p>Loading...</p>
            : <div>
              {channelVideos ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7 mx-auto mt-10">
                  {channelVideos.filter(video => video.videoStatus === "Completed")
                    .map((video) => (
                      // console.log(video)
                      <GridView key={video._id} video={video} param={param} />
                    ))}
                </div>
              ) : (
                <Link href={`/dashboard/${param}`} >
                  <div className='flex flex-col items-center justify-center gap-3 mt-28'>
                    <p>
                      There are no videos yet. Click the button below to upload videos
                    </p>
                    <div className='py-1 px-2 mr-3 sm:mr-0 bg-primary hover:bg-primary/80 rounded-md w-fit'>
                      <UploadBtn />
                    </div>
                  </div>
                </Link>
              )}
            </div>
        }
      </div> */}
    </main>
  )
}

export default ChannelPageUsingUsername
