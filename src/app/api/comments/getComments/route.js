import { connect } from "@/dbConfig/dbConfig";
import Comment from "@/models/commentsModel";

connect();

export async function POST(req) {
    const reqBody = await req.json();
    const { videoId } = reqBody;
    try {
        const commentVideo = await Comment.find({ videoId: videoId })
            .populate('author')
            .lean()

        console.log(commentVideo, "commentVideo");

        return new Response(JSON.stringify({message: "Getting comments successfully", comments: commentVideo}), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
}
