"use client"
import Image from "next/image";
import profilePicture from '@/Images/profile.jpg';
import thumbnail from '@/Images/thumbnail.jpg'
import { useEffect, useState } from "react";
import { useHomeContext } from "@/ContextAPI/Context/HomeContext";
import Navbar from '@/components/HomePage/Navbar';
import PreviousAndNextArrows from "@/components/HomePage/PreviousAndNextArrows";
import Video from "@/components/Video";
import axios from "axios";
import GridView from "@/components/ChannelPageVideoView/GridView";

export default function Home() {
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [categoryVideos, setCategoryVideos] = useState([]);
  const { videoCategories } = useHomeContext();

  useEffect(() => {
    // videoCategories.map(category => {
    getVideosForCategory();
    // })
  }, [])

  async function getVideosForCategory() {
    const videoBasedOnCategory = await axios.get(`/api/videos/getAllCategoryVideos`)
    console.log(videoBasedOnCategory);
    setCategoryVideos(videoBasedOnCategory.data.videos);
  }

  // const { videosIndex } = useHomeContext();
  // const [windowWidth, setWindowWidth] = useState(0);

  // const handleResize = () => {
  //   setWindowWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   setWindowWidth(window.innerWidth);
  //   window.addEventListener('resize', handleResize);


  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // const lowerCaseCategory = category.name.toLowerCase()

  {/* // <main key={index} className='mt-16 px-2 lg:mt-0'> */ }
  {/* <div className="flex justify-between mt-5">
  <PreviousAndNextArrows lowerCaseCategory={lowerCaseCategory} windowWidth={windowWidth} {...category} />
  



  category.videos
            // .slice(videosIndex[lowerCaseCategory], videosIndex[lowerCaseCategory] +
            //   (windowWidth > 1024
            //     ? 4
            //     : windowWidth > 768
            //       ? 3
            //       : windowWidth > 640
            //         ? 2
            //         : 1))
            .map((video, index) => {




</div> */}

  return (
    <div className="overflow-x-hidden px-4 pb-4">
      <Navbar />
      {
        videoCategories.map(category => {
          return (
            <>
              <h3 key={category._id} className='mt-4 mb-3'>{category.categoryName}</h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7 mx-auto mt-2">
                {categoryVideos.map(video => (
                  category.categoryName === video.category && <GridView key={video._id} video={video} />
                ))}
              </div>
            </>
          )
        })
      }
    </div>
  )
}