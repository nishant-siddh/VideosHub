import Image from "next/image";
import React, { useEffect, useState } from 'react'
import { useCommentsContext } from '@/ContextAPI/Context/CommentsContext';
import CommentsMapping from './CommentsMapping';
import profileImage from "@/Images/profilePicture.jpeg";

const VideosCommentSection = () => {
  const { handleComment, comments } = useCommentsContext();
  const [commentInputValue, setCommentInputValue] = useState("");

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
              onClick={() => handleComment({ commentInputValue, setCommentInputValue })}
            >
              Comment
            </button>
          </div>
        </div>
      </div>


      <div className='mt-10 flex flex-col gap-6'>
        {comments && (
          comments.map((comment, index) => {
            const commentOrReply = 'comment'
            return (
              <>
                <div key={comment.id} className='flex flex-col gap-2'>
                  <CommentsMapping comment={comment} index={index} commentOrReply={commentOrReply} />
                  {
                    comment.replies.map((reply, index) => {
                      const commentOrReply = 'reply'
                      return (
                        <div key={reply.id} className='flex flex-col gap-2 ml-10'>
                          <CommentsMapping comment={reply} index={index} commentOrReply={commentOrReply} />
                        </div>
                      )
                    })
                  }
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