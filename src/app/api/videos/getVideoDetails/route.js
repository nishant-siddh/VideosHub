import { connect } from '@/dbConfig/dbConfig'
import Video from '@/models/videosModel'

connect()

export const dynamic = 'force-static'

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const param = searchParams.get("username") || searchParams.get("id");

        if(searchParams.has('id')) {
            const videos = await Video.findOne({ _id: param });
            console.log(videos, 'videos from route js for edit video page');
            return new Response(JSON.stringify({ videos }), { status: 200 });
        }
        else if(searchParams.has('username')) {
            const videos = await Video.find({ uploadedBy: param });
            console.log(videos, 'videos from route js for dashboard');
            return new Response(JSON.stringify({ videos }), { status: 200 });
        }

    } catch (error) {
        console.log(error, 'error in getting video details');
        return new Response(JSON.stringify({ message: 'error in getting video details' }), { status: 500 });
    }
}