import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Video from "@/models/videosModel";

connect();

export async function POST(req) {
  const reqBody = await req.json();
  const { videoId, commentText, commentOrReply, channelDetail, userDetail } = reqBody;
  try {
    const video = await Video.findOne({ videoId });
    if (!video) {
      return new Response(JSON.stringify({ message: "Video not found" }), {
        status: 404,
      });
    }

    if (commentOrReply === 'comment') {
      video.comments.push({
        author: channelDetail.username,
        profileImage: userDetail.profileImage,
        text: commentText
      });
    }
    else {
      video.comments[0].replies.push({
        author: channelDetail.username,
        profileImage: userDetail.profileImage,
        text: commentText
      });
    }

    await video.save();

    return new Response(JSON.stringify({ message: "Commented successfully" }), { status: 200 });
  } catch(error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {status: 500});
   }
}
