"use client";
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import UploadVideoDialogBox from '@/components/Channel/DialogBox/UploadVideoDialogBox';
import UploadBtn from '@/components/Channel/UploadBtn';
import DashboardVideoListView from '@/components/Dashboard/DashboardVideoListView';
import axios from 'axios';
import React, { useEffect } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillGridFill } from 'react-icons/bs';

const Dashboard = ({ params }) => {
  const param = params.slug;
  const { channelDetail, userDetail, getChannelAndUserDetails } = useChannelContext();
  const { getVideoDataForView, channelVideos } = useVideoContext();

  const videosDetailsHeader = [
    { heading: 'Videos', width: '40%', dbNameForDetail: 'title' },
    { heading: 'Status', width: '15%', dbNameForDetail: 'videoStatus' },
    { heading: 'Date', width: '20%', dbNameForDetail: 'updatedAt' },
    { heading: 'Likes', width: '10%', dbNameForDetail: 'meta.likes' },
    { heading: 'Views', width: '10%', dbNameForDetail: 'meta.views' },
  ]

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
    <>
      <main className='flex justify-center items-start overflow-x-hidden'>
        <div className='bg-black w-full mx-3 p-5 rounded-lg'>
          {/* channel content header */}
          <div className='flex justify-between'>
            <h2>Channel Content</h2>

            {/* buttons */}
            <div className='flex gap-3'>
              {/* list and grid view buttons */}
              <div className='flex gap-3'>
                <button className='bg-zinc-800 p-2 rounded-md'><AiOutlineUnorderedList /></button>
                <button className='bg-zinc-800 p-2 rounded-md'><BsFillGridFill /></button>
              </div>
              {/* add video button */}
              <div className='py-1 px-2 mr-3 sm:mr-0 bg-primary rounded-md'>
                <UploadBtn />
                <UploadVideoDialogBox />
              </div>
            </div>
          </div>

          {/* videos section */}
          <div className='mt-5 bg-zinc-800 rounded-sm'>
            {/* Videos List view */}
            <table className="w-full">
              <thead className="sticky top-0">
                <tr className='flex justify-between bg-zinc-900 border-b-2 w-full rounded-sm px-3 py-2'>
                  {videosDetailsHeader.map((header, index) => (
                    <th key={index} className='text-left' style={{ width: header.width }}>{header.heading}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {
                  channelVideos &&
                  channelVideos.map((video) => {
                    return (
                      <>
                        <DashboardVideoListView key={video._id} video={video} videosDetailsHeader={videosDetailsHeader} />
                      </>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard