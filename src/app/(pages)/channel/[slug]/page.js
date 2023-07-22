"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import profilePicture from '@/Images/profile.jpg';
import thumbnail from '@/Images/thumbnail.jpg'
import { useHomeContext } from "../../../../ContextAPI/Context/HomeContext";
import appwriteStorage from '@/appwrite/config';
import UploadBtn from '@/components/Channel/UploadBtn';

const ChannelPage = ({ params }) => {
  const param = params.slug;
  const { videosIndex, isLoading, setIsLoading } = useHomeContext();
  const [windowWidth, setWindowWidth] = useState(0);
  const [userDetail, setUserDetail] = useState({});
  const [channelDetails, setChannelDetails] = useState({});
  const [videos, setVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  // change window width on resize
  useEffect(() => {
    setWindowWidth(window.innerWidth);
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
      if (param) {
        const resUser = await axios.post(`/api/users/userDetails`, { param });
        const resChannel = await axios.post(`/api/channel/channelDetails`, resUser.data.userData);
        setUserDetail(resUser.data.userData);
        setChannelDetails(resChannel.data.channelData);
      }
    })();
    handleListVideos();
  }, []);

  // useEffect(() => {
  //   handleListVideos();
  // }, [])

  

  const handleListVideos = async () => {
    try {
      setIsLoading(true);
      const response = await appwriteStorage.listVideos();
      // console.log(response);
      setVideos(response.files);
      return response;

    } catch (error) {
      console.log(error, 'error in listing files');
    } finally{
      setIsLoading(false);
    }
  }

  const handleGetVideoView = async (fileId) => {
    try {
      console.log(fileId, 'this is file id');
      setIsLoading(true);
      const response = await appwriteStorage.getVideoView(fileId);
      // console.log(response);
      setVideoUrl(response.href);
    }
    catch (error) {
      console.log(error, 'error in getting file view');
    } finally{
      setIsLoading(false);
    }
  }

  // const Categories = [
  //   {
  //     name: 'Games',
  //     videos: [
  //       {
  //         id: 1,
  //         title: 'Ye kya ho gaya😲😲🤯🤯',
  //         description: 'This is video 1',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Mera Channel',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 2,
  //         title: 'Lag gae bhai😂😂. Fastest way to become coder.',
  //         description: 'This is video 2',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 3,
  //         title: 'All companies track you with this script.',
  //         description: 'This is video 3',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 4,
  //         title: 'Video 4',
  //         description: 'This is video 4',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 5,
  //         title: 'Extra Video',
  //         description: 'This is Extra video',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Entertainment',
  //     videos: [
  //       {
  //         id: 5,
  //         title: 'Video 5',
  //         description: 'This is video 5',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 5,
  //         title: 'Entra Video',
  //         description: 'This is video 5',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 6,
  //         title: 'Video 6',
  //         description: 'This is video 6',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 7,
  //         title: 'Video 7',
  //         description: 'This is video 7',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 8,
  //         title: 'Video 8',
  //         description: 'This is video 8',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Comedy',
  //     videos: [
  //       {
  //         id: 17,
  //         title: 'Video 17',
  //         description: 'This is video 17',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 17,
  //         title: 'Extra Video',
  //         description: 'This is video 17',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 18,
  //         title: 'Video 18',
  //         description: 'This is video 18',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 19,
  //         title: 'Video 19',
  //         description: 'This is video 19',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 20,
  //         title: 'Video 20',
  //         description: 'This is video 20',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Music',
  //     videos: [
  //       {
  //         id: 9,
  //         title: 'Video 9',
  //         description: 'This is video 9',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 9,
  //         title: 'Hello World',
  //         description: 'This is video 9',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 10,
  //         title: 'Video 10',
  //         description: 'This is video 10',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 11,
  //         title: 'Video 11',
  //         description: 'This is video 11',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 12,
  //         title: 'Video 12',
  //         description: 'This is video 12',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 12,
  //         title: 'Video 32',
  //         description: 'This is video 12',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Programming',
  //     videos: [
  //       {
  //         id: 13,
  //         title: 'Video 13',
  //         description: 'This is video 13',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 14,
  //         title: 'Video 14',
  //         description: 'This is video 14',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 15,
  //         title: 'Video 15',
  //         description: 'This is video 15',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 16,
  //         title: 'Video 16',
  //         description: 'This is video 16',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 16,
  //         title: 'Extra Video',
  //         description: 'This is video 16',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //     ]
  //   },
  //   {
  //     name: 'Technology',
  //     videos: [
  //       {
  //         id: 13,
  //         title: 'Video 13',
  //         description: 'This is video 13',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 14,
  //         title: 'Video 14',
  //         description: 'This is video 14',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 15,
  //         title: 'Video 15',
  //         description: 'This is video 15',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 16,
  //         title: 'Video 16',
  //         description: 'This is video 16',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //       {
  //         id: 16,
  //         title: 'Extra Video',
  //         description: 'This is video 16',
  //         thumbnail: thumbnail,
  //         views: 100,
  //         createdAt: '2 days ago',
  //         updatedAt: '2 days ago',
  //         duration: '2:30',
  //         videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
  //         channel: {
  //           id: 1,
  //           name: 'Channel 1',
  //           profilePicture: profilePicture,
  //           subscribers: 100,
  //           videos: 10,
  //         }
  //       },
  //     ]
  //   }
  // ]


  return (
    <main className='mt-16 mx-auto px-3 sm:w-3/4 min-w-fit'>
      {/* channel header section  */}
      <div className='w-full flex flex-col sm:flex-row items-center gap-3'>
        <div className='w-16 sm:w-28 min-w-fit'>
          <Image src={profilePicture} className='rounded-full w-16 h-16 max-h-16 sm:w-28 sm:h-28 sm:max-h-28' width={100} height={100} alt='profile image' />
        </div>

        {/* channel details and subscribe button */}
        <div className='w-4/5 flex flex-col sm:flex-row items-center justify-between gap-2'>
          <div className='flex flex-col items-center sm:items-start text-zinc-400'>
            {/* creator name */}
            <div className='text-white tracking-wider'>
              <h1 className='text-xl sm:text-2xl'>{userDetail.name}</h1>
            </div>

            {/* username and subscribers count and videos count */}
            <div className='flex flex-wrap justify-center text-xs sm:text-sm gap-1'>
              <p>@{`${userDetail.name}`.toLowerCase()}</p>
              <p>{channelDetails.totalSubscribers} Subscribers</p>
              <p>805 videos</p>
            </div>

            {/* channel description */}
            <p1 className='text-xs sm:text-sm mt-1'>{channelDetails.channelDescription}</p1>
          </div>

          {/* subscribe button */}
          <button className='bg-primary hover:bg-primary/80 text-white text-xs md:text-sm rounded-lg px-2 py-1' >Subscribe</button>
        </div>
      </div>

      <hr className='my-4 bg-red-400' />

      {/* channel videos section */}
      <div>
        {/* upload btn */}
        {/* {
          videos.length === 0 && ( */}
            <UploadBtn handleListVideos={handleListVideos} />
          {/* )
        } */}

        {
          isLoading
            ? <p>Loading...</p>
            : <div className="grid grid-cols-3 gap-4">
              {videos.map((video) => (
                <div key={video.$id} className="w-fit h-fit border cursor-pointer" onClick={() => handleGetVideoView(video.$id)}>
                  <Image src={thumbnail} width={300} alt="image" />
                  <p>{video.name}</p>
                </div>
              ))}
            </div>
        }

        {videoUrl && (
          <video src={videoUrl} width="320" height="240" controls autoPlay>
            Your browser does not support the video tag.
          </video>
        )}

      </div>
    </main>
  )
}

export default ChannelPage
