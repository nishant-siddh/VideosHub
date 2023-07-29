"use client"
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useHomeContext } from "@/ContextAPI/Context/HomeContext";
import appwriteStorage from '@/appwrite/config';
import UploadBtn from '@/components/Channel/UploadBtn';
import ChannelHeader from '@/components/Channel/ChannelHeader';
import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import UploadVideoInterface from '@/components/Channel/UploadVideoInterface';

const ChannelPage = ({ params }) => {
  const param = params.slug;
  const { videosIndex, isLoading, setIsLoading } = useHomeContext();
  const {setUserDetails, setChannelDetails, handleGetVideoView } = useChannelContext()
  const [windowWidth, setWindowWidth] = useState(0);
  const [modal, setModal] = useState();
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
      if (param) {
        const resChannel = await axios.post(`/api/channel/channelDetails`, { param });
        const resUser = await axios.post(`/api/users/userDetails`, {id: resChannel.data.channelData._id});
        setChannelDetails(resChannel.data.channelData);
        setUserDetails(resUser.data.userData);
      }
    })();
    // handleListVideos();
  }, []);

  // useEffect(() => {
  //   handleListVideos();
  // }, [])


  // const handleListVideos = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await appwriteStorage.listVideos();
  //     // console.log(response);
  //     setVideos(response.files);
  //     return response;

  //   } catch (error) {
  //     console.log(error, 'error in listing files');
  //   } finally{
  //     setIsLoading(false);
  //   }
  // }

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
      <ChannelHeader />

      <hr className='my-4 bg-red-400' />

      {/* channel videos section */}
      <div>
        {/* {
          videos.length === 0 && ( */}
            <UploadBtn modal={modal} />

            <dialog data-modal className='w-10/12 sm:w-[70%] md:w-[60%] h-4/5 bg-zinc-800 p-0 rounded-md'>
              <UploadVideoInterface />
            </dialog>
          {/* )
        } */}

        {/* {
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
        } */}

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
