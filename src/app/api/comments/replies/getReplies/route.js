import { connect } from "@/dbConfig/dbConfig";
import Reply from "@/models/commentRepliesModel";

connect();

export async function POST(req) {
    const reqBody = await req.json();
    const { commentId } = reqBody;
    try {
        const replyComment = await Reply.find({ commentId: commentId })
            .populate('commentId')
            .populate('author')
            .lean()

        console.log(replyComment, "replyComment");

        return new Response(JSON.stringify({message: "Getting comments successfully", replies: replyComment}), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
}
