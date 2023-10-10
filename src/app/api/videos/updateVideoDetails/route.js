import { connect } from '@/dbConfig/dbConfig';
import Video from '@/models/videosModel';

connect();

export async function PATCH(req) {
    const { id, values, videoDetails } = await req.json();
    console.log(id, values, videoDetails, 'id and values');
    try {
        const res = await Video.findOne({ _id: id });

        res.title = values.title;
        res.description = values.description;
        res.category = values.category;
        res.thumbnailId = videoDetails.thumbnailId;
        res.thumbnailUrl = videoDetails.thumbnailUrl;
        res.videoStatus = 'Completed';

        await res.save();

        return new Response(JSON.stringify({ message: 'Video Updated' }), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
}