import { connect } from "@/dbConfig/dbConfig";
import Channel from "@/models/channelsDetails";
import Video from "@/models/videosModel";

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { values, videoDetails } = reqBody;

        const newVideo = new Video({
            title: values.title,
            description: values.description,
            thumbnailId: videoDetails.thumbnailId,
            thumbnailUrl: videoDetails.thumbnailUrl,
            videoId: videoDetails.videoId,
            videoUrl: videoDetails.videoUrl,
            uploadedBy: videoDetails.username,
            category: values.category,
            videoStatus: videoDetails.videoCurrentStatus
        });

        const videosInChannel = await Channel.findOne({ username: videoDetails.username });
        videosInChannel.videosId.push(newVideo._id);
        await videosInChannel.save();

        await newVideo.save();

        return new Response(JSON.stringify({ message: 'Video added successfully' }), { status: 200 });

    } catch (error) {
        console.log(error, 'error in add videos api');
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}