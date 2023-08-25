import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SingleVideoGridView = ({video}) => {
  const [videoDetails, setVideoDetails] = useState({});

  useEffect(() => {
    (async () => {
      const videoDetails = await axios.get(`/api/videos/getVideoDetails?_id=${video}`);
      setVideoDetails(videoDetails.data.videos);
    })()
  }, [video])

  return (
    <div>
      {
        videoDetails &&
            <div>
              <h1>{videoDetails.title}</h1>
            </div>
      }
    </div>
  )
}

export default SingleVideoGridView
