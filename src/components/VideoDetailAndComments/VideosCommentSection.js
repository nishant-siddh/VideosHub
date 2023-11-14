import { useChannelContext } from '@/ContextAPI/Context/ChannelContext';
import { useTimeAndDateContext } from '@/ContextAPI/Context/TimeAndDateContext';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import profileImage from "@/Images/profilePicture.jpeg";
import axios from 'axios';
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

const VideosCommentSection = () => {
  const { channelDetail, userDetail } = useChannelContext();
  const { videoDataForView } = useVideoContext();
  const { formatTimeAgo } = useTimeAndDateContext();
  const [commentInputValue, setCommentInputValue] = useState("");
  const [comments, setComments] = useState([]);
  const [replyBtnLCicked, setReplyBtnLCicked] = useState(false);
  const [replyInputValue, setReplyInputValue] = useState("");

  useEffect(() => {
    if (videoDataForView.comments) {
      setComments(videoDataForView.comments);
    }
  }, [videoDataForView.comments]);


  async function handleComment() {
    try {
      const commentRes = await axios.post("/api/comments", {
        videoId: videoDataForView.videoId,
        commentOrReply: "comment",
        commentText: commentInputValue,
        channelDetail: channelDetail,
        userDetail: userDetail,
      });
      setComments(commentRes.data.videoComments);
      setCommentInputValue("");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function handleReply() {
    try {
      setReplyBtnLCicked(true);
      const commentRes = await axios.post("/api/comments", {
        videoId: videoDataForView.videoId,
        commentOrReply: "reply",
        commentText: commentInputValue,
        channelDetail: channelDetail,
        userDetail: userDetail,
      });
      setComments(commentRes.data.videoComments);
      setCommentInputValue("");
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


      <div className='mt-10 flex flex-col gap-6'>
        {comments && (
          comments.map((comment) => {
            const commentedAt = new Date(comment.createdAt);
            return (
              <>
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-3 text-sm'>
                    <div className='rounded-full w-fit'>
                      {comment.profileImage
                        ? <Image src={comment.profileImage} className='flex justify-center items-center bg-red-500 rounded-full' alt="" />
                        : (
                          <div className='w-8 h-8 flex justify-center items-center bg-red-500 rounded-full'>
                            {userDetail.name && userDetail.name[0]}
                          </div>
                        )
                      }
                    </div>
                    <div>
                      <div className='flex items-center gap-2 text-xs'>
                        <h6 className={`${comment.author === videoDataForView.uploadedBy && 'bg-zinc-400 text-white rounded-full px-2'}`}>@{comment.author}</h6>
                        <span className='text-neutral-400'>{formatTimeAgo(commentedAt)}</span>
                      </div>
                      <span>{comment.text}</span>
                    </div>
                  </div>

                  {/* likes, dislikes and reply */}
                  <div className='px-10'>
                    <div className='flex gap-3'>
                      <div className='flex items-center gap-1'>
                        <button><AiOutlineLike /></button>
                        <span className='text-xs'>{comment.likes}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <button><AiOutlineDislike /></button>
                      </div>
                      <div className='flex text-xs items-center gap-1 cursor-pointer' onClick={handleReply}>
                        <span>Reply</span>
                      </div>
                    </div>

                    <div className={`flex-col gap-2 w-full ${replyBtnLCicked ? 'flex' : 'hidden'}`}>
                      <textarea
                        className="w-full py-1 text-sm bg-transparent border-b-2 border-zinc-700 focus:border-white transition ease-in-out delay-75 duration-300 outline-none resize-none"
                        rows={2}
                        placeholder="Add a public comment..."
                        value={replyInputValue}
                        onChange={(e) => setReplyInputValue(e.target.value)}
                      ></textarea>
                      <div className='flex items-center justify-end gap-4 text-sm'>
                        <button
                          className="text-white hover:text-zinc-400 transition ease-in-out delay-75 duration-300"
                          onClick={() => {setCommentInputValue(''), setReplyBtnLCicked(false)}}
                        >
                          Cancel
                        </button>
                        <button
                          className="border px-2 py-1 rounded-full flex items-center gap-1 hover:bg-zinc-800 transition delay-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-800"
                          disabled={!replyInputValue}
                          onClick={handleReply}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        )}
      </div>
    </div>
  )
}

export default VideosCommentSection