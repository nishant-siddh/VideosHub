import { connect } from "@/dbConfig/dbConfig";
import Comment from "@/models/commentsModel";
import Video from "@/models/videosModel";

connect();

export async function POST(req) {
  const reqBody = await req.json();
  const { videoId, userChannelId, commentText } = reqBody;
  try {
    console.log(reqBody, "reqBody");
    const videoComment = await Video.findOne({ _id: videoId });

    if (!videoComment) {
      return new Response(JSON.stringify({ message: "Video not found" }), { status: 404 });
    }
    
    const newComment = new Comment({
      videoId: videoId,
      author: userChannelId,
      text: commentText,
    });
    
    console.log(newComment, "newComment");
    
    await newComment.save();

    return new Response(JSON.stringify({ message: "Commented successfully" }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}
