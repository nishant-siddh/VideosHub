import { connect } from "@/dbConfig/dbConfig";
import Comment from "@/models/commentsModel";
import Reply from "@/models/commentRepliesModel";

connect();

export async function POST(req) {
  const reqBody = await req.json();
  const { commentId, userChannelId, replyText } = reqBody;
  try {
      const commentReplies = await Comment.findOne({ _id: commentId });

      if (!commentReplies) {
        return new Response(JSON.stringify({ message: "Comment not found" }), { status: 404 });
      }

      const newReply = new Reply({
        commentId,
        author: userChannelId,
        text: replyText,
      });

      console.log(newReply, "newReply");
      await newReply.save();

      commentReplies.replies.push(newReply._id);
      await commentReplies.save();

      return new Response(JSON.stringify({ message: "Replied successfully" }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}
