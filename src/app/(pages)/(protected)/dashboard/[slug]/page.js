"use client";
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import SingleVideoGridView from '@/components/Dashboard/SingleVideoGridView';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dashboard = ({ params }) => {
  const param = params.slug;
  const { channelDetail, setChannelDetails, setUserDetails, setLoading } = useChannelContext();

  useEffect(() => {
    (async () => {
      if (param) {
        setLoading();
        const resChannel = await axios.post(`/api/channel/channelDetails`, { param });
        const resUser = await axios.post(`/api/users/userDetails`, { id: resChannel.data.channelData._id });
        setChannelDetails(resChannel.data.channelData);
        setUserDetails(resUser.data.userData);
        setLoading();
      }
    })();
  }, [param]);

  return (
    <main className='px-3 mx-auto min-w-fit sm:w-3/4'>
      {/* {console.log(channelDetail.videosId, 'channelDetail from dashboard')} */}
      {
        channelDetail.videosId
          ? channelDetail.videosId.map((video, index) => (
            <SingleVideoGridView key={index} video={video} />
          ))
          : (
            <div className='flex justify-center items-center h-screen'>
              <h1 className='text-2xl'>No Videos</h1>
            </div>
          )
      }
    </main>
  )
}

export default Dashboard
