"use client"
import Image from "next/image";
import profilePicture from '@/Images/profile.jpg';
import thumbnail from '@/Images/thumbnail.jpg'
import { useEffect, useState } from "react";
import { useHomeContext } from "@/ContextAPI/Context/HomeContext";
import Navbar from '@/components/HomePage/Navbar';
import PreviousAndNextArrows from "@/components/HomePage/PreviousAndNextArrows";

export default function Home() {
  const { videosIndex } = useHomeContext();
  const [windowWidth, setWindowWidth] = useState(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const Categories = [
    {
      name: 'Games',
      videos: [
        {
          id: 1,
          title: 'Ye kya ho gaya😲😲🤯🤯',
          description: 'This is video 1',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Mera Channel',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 2,
          title: 'Lag gae bhai😂😂. Fastest way to become coder.',
          description: 'This is video 2',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 3,
          title: 'All companies track you with this script.',
          description: 'This is video 3',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 4,
          title: 'Video 4',
          description: 'This is video 4',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 5,
          title: 'Extra Video',
          description: 'This is Extra video',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        }
      ]
    },
    {
      name: 'Entertainment',
      videos: [
        {
          id: 5,
          title: 'Video 5',
          description: 'This is video 5',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 5,
          title: 'Entra Video',
          description: 'This is video 5',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 6,
          title: 'Video 6',
          description: 'This is video 6',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 7,
          title: 'Video 7',
          description: 'This is video 7',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 8,
          title: 'Video 8',
          description: 'This is video 8',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        }
      ]
    },
    {
      name: 'Comedy',
      videos: [
        {
          id: 17,
          title: 'Video 17',
          description: 'This is video 17',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 17,
          title: 'Extra Video',
          description: 'This is video 17',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 18,
          title: 'Video 18',
          description: 'This is video 18',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 19,
          title: 'Video 19',
          description: 'This is video 19',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 20,
          title: 'Video 20',
          description: 'This is video 20',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        }
      ]
    },
    {
      name: 'Music',
      videos: [
        {
          id: 9,
          title: 'Video 9',
          description: 'This is video 9',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 9,
          title: 'Hello World',
          description: 'This is video 9',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 10,
          title: 'Video 10',
          description: 'This is video 10',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 11,
          title: 'Video 11',
          description: 'This is video 11',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 12,
          title: 'Video 12',
          description: 'This is video 12',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 12,
          title: 'Video 32',
          description: 'This is video 12',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        }
      ]
    },
    {
      name: 'Programming',
      videos: [
        {
          id: 13,
          title: 'Video 13',
          description: 'This is video 13',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 14,
          title: 'Video 14',
          description: 'This is video 14',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 15,
          title: 'Video 15',
          description: 'This is video 15',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 16,
          title: 'Video 16',
          description: 'This is video 16',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 16,
          title: 'Extra Video',
          description: 'This is video 16',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
      ]
    },
    {
      name: 'Technology',
      videos: [
        {
          id: 13,
          title: 'Video 13',
          description: 'This is video 13',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 14,
          title: 'Video 14',
          description: 'This is video 14',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 15,
          title: 'Video 15',
          description: 'This is video 15',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 16,
          title: 'Video 16',
          description: 'This is video 16',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
        {
          id: 16,
          title: 'Extra Video',
          description: 'This is video 16',
          thumbnail: thumbnail,
          views: 100,
          createdAt: '2 days ago',
          updatedAt: '2 days ago',
          duration: '2:30',
          videoUrl: 'https://www.youtube.com/watch?v=7XgqJQZn8ZU',
          channel: {
            id: 1,
            name: 'Channel 1',
            profilePicture: profilePicture,
            subscribers: 100,
            videos: 10,
          }
        },
      ]
    }
  ]

  return (
    <div className="flex flex-col mx-auto">
      <Navbar />
        {Categories.map((category, index) => {
          const lowerCaseCategory = category.name.toLowerCase()
          return (
            <main key={index} className='mt-16 px-2 lg:mt-0'>
              <div className="flex justify-between mt-5">
                <h3 className='ml-4 mb-2'>{category.name}</h3>

                {/* previous and next buttons */}
                <PreviousAndNextArrows lowerCaseCategory={lowerCaseCategory} windowWidth={windowWidth} {...category} />

              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4'>
                {category.videos.slice(videosIndex[lowerCaseCategory], videosIndex[lowerCaseCategory] +
                  (windowWidth > 1024
                    ? 4
                    : windowWidth > 768
                      ? 3
                      : windowWidth > 640
                        ? 2
                        : 1)).map((video, index) => {
                          return (
                            <div key={index} className="w-fit">
                              {/* video thumbnail */}
                              <div>
                                <Image src={video.thumbnail} className='rounded-md hover:rounded-none ease-in duration-300 w-96 sm:w-72 md:w-60' alt={video.title} width={200} height={200} />
                              </div>

                              {/* vidoes title and creator profile picture */}
                              <div className='flex items-start gap-2 mt-2'>
                                <div className="w-8 min-w-fit">
                                  <Image src={video.channel.profilePicture} className='rounded-full w-8 h-8 max-h-8' alt={video.channel.name} width={40} height={40} />
                                </div>

                                <div className='max-w-xs sm:max-w-xs md:max-w-[13rem] xl:max-w-[12rem]'>
                                  <h4 className='text-sm font-semibold'>{video.title}</h4>
                                  <div>
                                    <p className='text-xs text-gray-400'>{video.channel.name}</p>
                                    <div className="flex text-xs text-gray-400">
                                      <p>{video.views} views</p>&nbsp;
                                      <span>.</span>
                                      &nbsp;<p>{video.createdAt}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
              </div>
            </main>
          )
        })}
    </div>
  )
}