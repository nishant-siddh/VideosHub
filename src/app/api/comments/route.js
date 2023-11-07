import connect from "@/dbConfig/dbConfig";
import Video from "@/models/videosModel";

connect();

export async function POST(req) {
  const reqBody = await req.json();
  const { videoId, text, commentOrReply } = reqBody;
  try {
    const video = await Video.findOne({ videoId });
    if (!video) {
      return new Response(JSON.stringify({ message: "Video not found" }), {
        status: 404,
      });
    }

    if(commentOrReply === 'comment') {
        video.comments.push({
          text: commentOrReply,
        });
    }
    else {
        video.comments[0].replies.push({
          text: commentOrReply,
        });
    }

    await video.save();

    return new Response(JSON.stringify({message: "Commented successfully"}), { status: 200 });
  } catch {}
}
