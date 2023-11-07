import { useChannelContext } from "@/ContextAPI/Context/ChannelContext";
import React, { useEffect, useState } from "react";
import profileImage from "@/Images/profilePicture.jpeg";
import Image from "next/image";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaFolderPlus } from "react-icons/fa";
import axios from "axios";

const VideoDetailAndComments = ({ videoDataForView }) => {
  const { userDetail, channelDetail } = useChannelContext();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  async function handleComment() {
    const commentRes = await axios.post("/api/comments", {
      videoId: videoDataForView.videoId,
      commentOrReply: 'comment',
      text: commentInputValue,
    });
  }

  return (
    <div>
      <h5 className="my-3">{videoDataForView.title}</h5>
      <div className="flex flex-wrap gap-3 justify-between">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 w-fit">
            <Image
              src={profileImage}
              width={20}
              height={20}
              className="w-8 rounded-full"
              alt=""
            />
          </div>
          <div className="flex sm:justify-between items-center gap-3 sm:w-fit w-full sm:flex-shrink-0">
            <div className="flex flex-col">
              <h6>{userDetail.name}</h6>
              <span className="text-xs text-zinc-400">
                {channelDetail.totalSubscribers} subscribers
              </span>
            </div>
            <button className="text-xs lg:text-sm text-gray-500 px-2 md:px-3 py-1 rounded-full bg-white hover:text-gray-400 flex items-center gap-1 shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
              <AiOutlineUserAdd />
              Subscribe
            </button>
          </div>
        </div>
        {/* likes dislikes and save button */}
        <div className="flex gap-1 md:gap-3 justify-between md:justify-end sm:flex-shrink-0 items-center text-xs w-full sm:w-fit lg:text-sm">
          <div className="flex rounded-full border">
            <button className="px-2 md:px-3 py-1 rounded-l-full border-r-2 flex gap-1 items-center hover:bg-zinc-800 transition delay-75">
              {liked ? <AiFillLike /> : <AiOutlineLike />} Like
            </button>
            <button className="px-2 md:px-3 py-1 rounded-r-full flex gap-1 items-center hover:bg-zinc-800 transition delay-75">
              {disliked ? <AiFillDislike /> : <AiOutlineDislike />} Dislike
            </button>
          </div>
          <button className="border px-2 md:px-3 py-1 rounded-full flex items-center gap-1 hover:bg-zinc-800 transition delay-75">
            <FaFolderPlus /> Save
          </button>
        </div>
      </div>

      {/* description ssection */}
      <div className="flex flex-col gap-2 items-start bg-zinc-800 mt-5 p-3 rounded-lg">
        <div className="flex gap-2 text-sm">
          <span>
            {videoDataForView.meta && videoDataForView.meta.views} views
          </span>
          <span>5 months ago</span>
        </div>
        <p
          className={`text-sm text-white ${
            isDescriptionOpen ? "line-clamp-none" : " line-clamp-2"
          }`}
        >
          {videoDataForView.description}
        </p>

        {/* show more button */}
        <button
          className="text-xs text-gray-300 hover:text-gray-400 transition delay-75"
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
        >
          {isDescriptionOpen ? "Show less" : "Show more"}
        </button>

        {/* video details */}
        {/* <div className="flex flex-wrap gap-3 mt-5">
          <div className="flex gap-1 items-center">
            <span className="text-gray-500">Views</span>
            <span className="text-gray-400">
              {videoDataForView.views}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-gray-500">Uploaded</span>
            <span className="text-gray-400">
              {videoDataForView.uploadedAt}
            </span>
          </div>
        </div> */}
      </div>

      {/* comments section */}
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
              className={`items-center justify-end gap-4 text-sm ${
                !commentInputValue ? "hidden" : "flex"
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
      </div>
    </div>
  );
};

export default VideoDetailAndComments;
