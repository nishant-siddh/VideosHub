import React, { useState } from "react";
import axios from "axios";
import VideoDetailsSection from "./VideoDetailsSection";
import VideoDescriptionSection from "./VideoDescriptionSection";
import { useChannelContext } from "@/ContextAPI/Context/ChannelContext";
import { useVideoContext } from "@/ContextAPI/Context/VideoContext";
import VideosCommentSection from "./VideosCommentSection";

const VideoDetailAndComments = () => {
  const { videoDataForView } = useVideoContext();

  return (
    <div>
      <h5 className="my-3">{videoDataForView.title}</h5>
      <VideoDetailsSection />

      {/* description section */}
      <VideoDescriptionSection />

      {/* comments section */}
      <VideosCommentSection />
    </div>
  );
};

export default VideoDetailAndComments;
