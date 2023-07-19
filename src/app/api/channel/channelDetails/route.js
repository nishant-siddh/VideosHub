import { connect } from '@/dbConfig/dbConfig';
import Channel from '@/models/channelsDetails';
import User from '@/models/userModel';

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const channelDetails = await Channel.findById(reqBody.channelId);

        return new Response(JSON.stringify({ message: 'Channel details found', channelData: channelDetails }), { status: 200 });

    } catch (error) {
        console.log('Error in channel found', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}