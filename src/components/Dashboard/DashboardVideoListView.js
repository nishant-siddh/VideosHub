import { useVideoContext } from "@/ContextAPI/Context/VideoContext"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

const DashboardVideoListView = ({ videoId, videosDetailsHeader }) => {
  const [videoDetails, setVideoDetails] = useState({})
  const { formatDate } = useVideoContext();

  useEffect(() => {
    (async () => {
      try {
        const videoRes = await axios.get(`/api/videos/getVideoDetails?id=${videoId}`)
        console.log(videoRes.data.videos, 'videoRes from dashboard video list view');
        setVideoDetails(videoRes.data.videos)
      } catch (error) {
        console.log(error, 'error in getting video details');
        throw error
      }
    })()
  }, [videoId])

  return (
    <>
      <tr className="flex justify-between rounded-sm p-3 border-b-2">
        {
          videosDetailsHeader.map((header, index) => (
            videoDetails ?
              (header.heading === 'Videos' ?
                (
                  <td key={index} className="text-left" style={{ width: header.width }}>
                    <div className='flex items-start gap-3'>
                      <div className='w-20 h-14 bg-zinc-900 rounded-md'>
                        {
                          videoDetails.thumbnailUrl &&
                          <Image src={videoDetails.thumbnailUrl} alt="video thumbnail" width={50} height={50} className='w-20 h-14 rounded-md' />
                        }
                        {/* <div className='w-full h-full bg-zinc-900 rounded-md'></div> */}
                      </div>
                      <div>
                        <p className='text-sm font-semibold'>{videoDetails[header.dbNameForDetail]}</p>
                        <p className='text-xs'>{videoDetails.description}</p>
                      </div>
                    </div>
                  </td>
                )
                : (
                  <td key={index} className="text-sm" style={{ width: header.width }}>
                    {header.dbNameForDetail.includes('.') ?
                      header.dbNameForDetail.split('.').reduce((obj, key) => obj && obj[key], videoDetails)
                      : header.dbNameForDetail === 'updatedAt' ? formatDate(videoDetails[header.dbNameForDetail])
                        : videoDetails[header.dbNameForDetail]}
                  </td>
                )
              ) : (
                <td key={index} className="text-sm" style={{ width: header.width }}>
                  Loading...
                </td>
              )
          ))
        }
      </tr>
    </>
  )
}

export default DashboardVideoListView
