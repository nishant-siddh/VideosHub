import { connect } from "@/dbConfig/dbConfig";
import Channel from "@/models/channelsDetails";
import Video from "@/models/videosModel";

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { values, videoDetails } = reqBody;
        console.log(values, videoDetails, 'this is add videos req body')
        
        const newVideo = new Video({
            title: values.title,
            description: values.description,
            videoId: videoDetails.videoId,
            videoUrl: videoDetails.videoUrl,
            thumbnailId: videoDetails.thumbnailId,
            thumbnailUrl: videoDetails.thumbnailUrl,
            videoStatus: videoDetails.videoCurrentStatus,
            uploadedBy: videoDetails.username,
            category: values.category
        });

        const videosInChannel = await Channel.findOne({ username: videoDetails.username });
        videosInChannel.videosId.push(newVideo._id);
        
        await newVideo.save();
        await videosInChannel.save();


        return new Response(JSON.stringify({ message: 'Video added successfully' }), { status: 200 });

    } catch (error) {
        console.log(error, 'error in add videos api');
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}