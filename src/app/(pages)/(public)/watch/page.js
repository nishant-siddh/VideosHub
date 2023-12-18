"use client";
import { useSidebarContext } from "@/ContextAPI/Context/SidebarContext";
import { useVideoContext } from "@/ContextAPI/Context/VideoContext";
import GridView from "@/components/ChannelPageVideoView/GridView";
import ListView from "@/components/ChannelPageVideoView/ListView";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import profilePicture from "@/Images/profile.jpg";
import thumbnail from "@/Images/thumbnail.jpg";
import VideoDetailAndComments from "@/components/VideoDetailAndComments/VideoDetailAndComments";
import { useCommentsContext } from "@/ContextAPI/Context/CommentsContext";
import axios from "axios";
import { useChannelContext } from "@/ContextAPI/Context/ChannelContext";

const Watch = () => {
    const { channelVideos, getVideoDataForView, videoDataForView, setVideoDataForView, } = useVideoContext();
    const { isLargeOpen, isSmallOpen, setIsLargeOpen, setIsSmallOpen } = useSidebarContext();
    const { handleGetCreatorDetails } = useChannelContext();
    const queryParam = useSearchParams();
    const videoId = queryParam.get("v");

    const videos = [
        {
            id: 1,
            title:
                "Ye kya ho gaya😲Ye kya ho gaya😲Ye kya ho gaya😲Ye kya ho gaya😲Ye kya ho gaya😲",
            description: "This is video 1",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Mera Channel",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 2,
            title: "Lag gae bhai😂. Fastest way to become coder.",
            description: "This is video 2",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 3,
            title: "All companies track you with this script.",
            description: "This is video 3",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 4,
            title: "Video 4",
            description: "This is video 4",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 5,
            title: "Extra Video",
            description: "This is Extra video",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 6,
            title: "Video 6",
            description: "This is video 6",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 7,
            title: "Video 7",
            description: "This is video 7",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 8,
            title: "Video 8",
            description: "This is video 8",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 9,
            title: "Video 17",
            description: "This is video 17",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 10,
            title: "Extra Video",
            description: "This is video 17",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 11,
            title: "Video 18",
            description: "This is video 18",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 12,
            title: "Video 19",
            description: "This is video 19",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 13,
            title: "Video 20",
            description: "This is video 20",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
        {
            id: 14,
            title: "Video 20",
            description: "This is video 20",
            thumbnail: thumbnail,
            views: 100,
            createdAt: "2 days ago",
            updatedAt: "2 days ago",
            duration: "2:30",
            videoUrl: "https://www.youtube.com/watch?v=7XgqJQZn8ZU",
            channel: {
                id: 1,
                name: "Channel 1",
                profilePicture: profilePicture,
                subscribers: 100,
                videos: 10,
            },
        },
    ];

    useEffect(() => {
        // toggleSidebar();
        setIsLargeOpen(false);
        setIsSmallOpen(false);
        (async () => {
            if (channelVideos.length === 0) {
                await getVideoDataForView(videoId, "id");
            } else {
                const res = channelVideos.filter((video) => video._id === videoId)[0];
                setVideoDataForView(res);
            }
        })();
    }, []);

    useEffect(() => {
        if (videoDataForView.uploadedBy) {
            handleGetCreatorDetails(videoDataForView.uploadedBy, 'username');
        }
    }, [videoDataForView.uploadedBy])

    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr,minmax(200px,1fr)] lg:grid-cols-[2.5fr,minmax(200px,1fr)] flex-grow-1 overflow-auto gap-6 px-3 mt-3">
            <div>
                <video
                    src={`https://cloud.appwrite.io/v1/storage/buckets/64b00e1003def55a569c/files/${videoDataForView.videoId}/view?project=64a5180c83b9cb6c1e8b&mode=admin`}
                    preload="metadata"
                    controls
                    // autoPlay
                    className="rounded-lg w-full border-none max-h-[500px]"
                ></video>

                <VideoDetailAndComments />

            </div>
            {/* suggested video */}
            <div className="sm:flex flex-col gap-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] w-full">
                {videos.map((video) => (
                    <div key={video.id}>
                        <ListView video={video} />
                        <GridView video={video} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Watch;
