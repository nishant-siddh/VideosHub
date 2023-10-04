import { connect } from '@/dbConfig/dbConfig';
import Video from '@/models/videosModel';

connect();

export async function GET(req) {
    const {id, updatedVideoDetails} = req.body;
    try {
        const res = await Video.findOne({ _id: id });

    } catch (error) {

    }
}