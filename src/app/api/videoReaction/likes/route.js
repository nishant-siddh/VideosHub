import { connect } from "@/dbConfig/dbConfig";
import Likes from "@/models/likesModel";

connect();

export async function POST(req) {
    const { videoId, userChannelId, isLike } = await req.json();
    console.log(videoId, userChannelId, isLike);
    try {
        const existingLike = await Likes.findOne({ userChannelId, videoId });

        if (existingLike) {
            if (isLike === existingLike.isLike) {
                await Likes.deleteOne({ userChannelId, videoId });
                return new Response(JSON.stringify({ message: "Deleted reaction Successfully" }), { status: 200 });
            } else {
                await Likes.updateOne(
                    { userChannelId, videoId },
                    { $set: { isLike } }
                );
                return new Response(JSON.stringify({ message: "Updated reaction successfully" }), { status: 200 });
            }
        } else {
            await Likes.create({
                videoId,
                userChannelId,
                isLike
            });
            return new Response(JSON.stringify({ message: "Reacted Successfully" }), { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
}
