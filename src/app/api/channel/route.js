import { connect } from '@/dbConfig/dbConfig';
import Channel from '@/models/channelsDetails';

connect()

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { username, channelDescription } = reqBody;

        const checkUserByUserName = await Channel.findOne({ username });
        if(checkUserByUserName) {
            return new Response(JSON.stringify({ error: 'Username already exists' }), { status: 400 });
        }

        const newChannel = new Channel({
            username,
            channelDescription
        })

        await newChannel.save();

        const channelDetails = await Channel.findOne({ username });

        return new Response(JSON.stringify({ message: 'Channel created successfully', channel: channelDetails }), { status: 200 });

    } catch (error) {
        console.log('Error in channel creation', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}