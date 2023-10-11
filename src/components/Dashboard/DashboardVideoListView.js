import { useVideoContext } from "@/ContextAPI/Context/VideoContext"
import Image from "next/image"
import Link from "next/link"
import { AiOutlineYoutube } from "react-icons/ai"
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline, MdOpacity } from "react-icons/md"

const DashboardVideoListView = ({ video, videosDetailsHeader }) => {
  const { formatDate } = useVideoContext();

  return (
    <>
      <tr className="flex justify-between rounded-sm p-3 border-b-2 group hover:bg-zinc-900">
        {
          videosDetailsHeader.map((header, index) => (
            video ?
              (header.heading === 'Videos' ?
                (
                  <td key={index} className="text-left" style={{ width: header.width }}>
                    <div className='flex items-start gap-3'>
                      {/* thumbnail image */}
                      <div className='w-20 h-16 bg-zinc-900 rounded-md'>
                        {
                          video.thumbnailUrl &&
                          <Image src={video.thumbnailUrl} alt="video thumbnail" width={50} height={50} className={`w-20 h-16 object-contain rounded-md ${video.videoStatus === 'Draft' && 'opacity-5 border-red-300'}`} />
                        }
                      </div>

                      {/* title and description and edit, delete buttons */}
                      <div className="w-[85%] h-[3.43rem]">
                        <p className='text-sm font-semibold'>{video[header.dbNameForDetail]}</p>
                        <div className="flex items-end gap-0">
                          <p className='text-xs h-[2rem] overflow-hidden text-zinc-400 group-hover:hidden'>{video.description ? video.description : 'Add Description'}</p>
                        </div>

                        <div className="hidden text-zinc-400 group-hover:block mt-3">
                          <Link href={`/dashboard/editVideo/${video._id}`}><button className='text-xl hover:text-zinc-300'><CiEdit /></button></Link>
                          <Link href={`/watch?v=${video._id}`}><button className='text-xl hover:text-zinc-300 mx-3'><AiOutlineYoutube /></button></Link>
                          <button className='text-xl hover:text-zinc-300'><MdDeleteOutline /></button>
                        </div>
                      </div>
                    </div>
                  </td>
                )
                : (
                  <td key={index} className="text-sm" style={{ width: header.width }}>
                    {header.dbNameForDetail.includes('.') ?
                      header.dbNameForDetail.split('.').reduce((obj, key) => obj && obj[key], video)
                      : header.dbNameForDetail === 'updatedAt' ? formatDate(video[header.dbNameForDetail])
                        : video[header.dbNameForDetail]}
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
