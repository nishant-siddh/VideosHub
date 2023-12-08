import { connect } from "@/dbConfig/dbConfig";
import Likes from "@/models/likesModel";

connect();

export async function POST(req) {
    const { videoId, userId, isLike } = req.body;
    try {
        const videoWithLikesData = await Likes.findOne({ videoId })

        if (!videoWithLikesData) {
            const newLikes = new Likes({
                videoId,
                userId,
                isLike,
            });

            await newLikes.save();
            return new Response(JSON.stringify({ message: "Reacted Successfully" }), { status: 200 });
        }

        const likes = await Likes.findByIdAndUpdate(videoId, {
            isLike: isLike
        })

        await likes.save();
        return new Response(JSON.stringify({ message: "Reacted Successfully" }), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
}
