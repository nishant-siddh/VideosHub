import { connect } from '@/dbConfig/dbConfig'
import Video from '@/models/videosModel'

connect()

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const param = searchParams.get("id");

        const videos = await Video.findOne({ _id: param });
        console.log(videos, 'videos from get video details');

        return new Response(JSON.stringify({ videos }), { status: 200 });
    } catch (error) {
        console.log(error, 'error in getting video details');

        return new Response(JSON.stringify({ message: 'error in getting video details' }), { status: 500 });
    }
}