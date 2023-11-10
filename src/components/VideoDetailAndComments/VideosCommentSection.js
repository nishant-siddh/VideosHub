import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { useTimeAndDateContext } from '@/ContextAPI/Context/TimeAndDateContext';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import profileImage from "@/Images/profilePicture.jpeg";
import axios from 'axios';
import Image from "next/image";
import React, { useState } from 'react'

const VideosCommentSection = () => {
  const { channelDetail, userDetail } = useChannelContext();
  const { videoDataForView } = useVideoContext();
  const { formatTimeAgo } = useTimeAndDateContext();
  const [commentInputValue, setCommentInputValue] = useState("");

  async function handleComment() {
    try {
      const commentRes = await axios.post("/api/comments", {
        videoId: videoDataForView.videoId,
        commentOrReply: "comment",
        commentText: commentInputValue,
        channelDetail: channelDetail,
        userDetail: userDetail,
      });
      setCommentInputValue("");
      console.log(commentRes.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className="mt-5">
      <h5 className="mb-3">Comments</h5>
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-fit">
          <Image
            src={profileImage}
            width={20}
            height={20}
            className="w-8 rounded-full"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <textarea
            className="w-full py-1 text-sm bg-transparent border-b-2 border-zinc-700 focus:border-white transition ease-in-out delay-75 duration-300 outline-none resize-none"
            rows={2}
            placeholder="Add a public comment..."
            value={commentInputValue}
            onChange={(e) => setCommentInputValue(e.target.value)}
          ></textarea>
          <div
            className={`items-center justify-end gap-4 text-sm ${!commentInputValue ? "hidden" : "flex"
              }`}
          >
            <button
              className="text-white hover:text-zinc-400 transition ease-in-out delay-75 duration-300"
              onClick={() => setCommentInputValue("")}
            >
              Cancel
            </button>
            <button
              className="border px-2 py-1 rounded-full flex items-center gap-1 hover:bg-zinc-800 transition delay-75"
              onClick={handleComment}
            >
              Comment
            </button>
          </div>
        </div>
      </div>


      {videoDataForView.comments && (
        videoDataForView.comments.map((comment) => {
          const commentedAt = new Date(comment.createdAt);
          return (
            <>
              <div>
                <div className='roumded-full w-8'>
                  {comment.profileImage
                    ? <Image src={comment.profileImage} alt="" />
                    : (
                      <div className='w-full'>
                        {userDetail.name && userDetail.name[0]}
                      </div>
                    )
                  }
                </div>
                <div>
                  <div>
                    <h6>{comment.author}</h6>
                    <span>{formatTimeAgo(commentedAt)}</span>
                  </div>
                  <span>{comment.text}</span>
                </div>
              </div>
            </>
          )
        })
      )}
    </div>
  )
}

export default VideosCommentSection