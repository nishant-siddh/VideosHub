import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videosModel";

connect();

export async function GET() {
    // const res = await ;

    return new Response(JSON.stringify({res}),{status: 200})
}