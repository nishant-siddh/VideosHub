import { connect } from "@/dbConfig/dbConfig";
import Likes from "@/models/likesModel";

connect();

export async function POST(req) {
    const { videoId, userChannelId } = await req.json();
    try {
        const videoReaction = await Likes.findOne({ userChannelId, videoId });
        if (videoReaction) {
            return new Response(JSON.stringify({ message: "Already reacted", reaction: videoReaction.isLike }), { status: 200 })
        }

        return new Response(JSON.stringify({ message: "Not reacted", reaction: null }), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 })
    }
}