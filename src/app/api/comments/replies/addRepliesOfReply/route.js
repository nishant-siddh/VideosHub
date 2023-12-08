import { connect } from "@/dbConfig/dbConfig";
import Reply from "@/models/commentRepliesModel";
import Comment from "@/models/commentsModel";

connect();

export async function POST(req) {
    const reqBody = await req.json();
    const { commentId, userChannelId, replyText, originalCommentId, username } = reqBody;
    try {

        const replyOfReply = await Reply.findOne({ _id: commentId });

        if (!replyOfReply) {
            return new Response(JSON.stringify({ message: "Reply not found" }), { status: 404 });
        }

        const newReply = new Reply({
            commentId: originalCommentId,
            replyTo: username,
            author: userChannelId,
            text: replyText,
        });

        console.log(newReply, "newReply");
        await newReply.save();


        const commentReplies = await Comment.findOne({ _id: originalCommentId });
        commentReplies.replies.push(newReply._id);
        await commentReplies.save();

        return new Response(JSON.stringify({ message: "Replied successfully" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
}