import { useTimeAndDateContext } from '@/ContextAPI/Context/TimeAndDateContext';
import { useVideoContext } from '@/ContextAPI/Context/VideoContext';
import React, { useState } from 'react'

const VideoDescriptionSection = () => {
    const { videoDataForView } = useVideoContext();
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const { formatTimeAgo } = useTimeAndDateContext();
    const videoCreatedAt = new Date(videoDataForView.createdAt);

    return (
        <div className="flex flex-col gap-2 items-start bg-zinc-800 mt-5 p-3 rounded-lg">
            <div className="flex gap-2 text-sm">
                <span>
                    {videoDataForView.meta && videoDataForView.meta.views} views
                </span>
                <span>{formatTimeAgo(videoCreatedAt)}</span>
            </div>
            <p
                className={`text-sm text-white ${isDescriptionOpen ? "line-clamp-none" : " line-clamp-2"}`}
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
        </div>
    )
}

export default VideoDescriptionSection