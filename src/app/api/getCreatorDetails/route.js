import {connect} from '@/dbConfig/dbConfig'
import Channel from '@/models/channelsDetailsModel'

connect();

export async function POST(req) {
    const {creatorUsername} = await req.json();
    try {
        const creatorDetails = await Channel.findOne({username: creatorUsername});
        if (!creatorDetails) {
            return new Response(JSON.stringify({message: 'Channel not found'}), {status: 404})
        }
        return new Response(JSON.stringify({message: 'Channel found', creatorDetails}), {status: 200})
    } catch (error) {
        console.log(error.message);
        return new Response(JSON.stringify({message: error.message}), {status: 500})
    }
}