import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videosModel";

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { title, description, duration, thumbnailUrl, videoUrl, uploadedBy, category, videostatus } = reqBody;
        // console.log(reqBody);

        const newVideo = new Video({
            title: title,
            description: description,
            duration: duration,
            thumbnailUrl: thumbnailUrl,
            videoUrl: videoUrl,
            uploadedBy: uploadedBy,
            category: category,
            videoCurrentStatus: videostatus
        });

        await newVideo.save();

        return new Response(JSON.stringify({ success: "Success" }), {
            status: 200,
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}