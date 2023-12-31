import { connect } from '@/dbConfig/dbConfig'
import Channel from '@/models/channelsDetailsModel'
import User from '@/models/userModel';

connect();

export async function POST(req) {
    const { creatorUsernameOrId, reqWith } = await req.json();
    try {
        let creatorChannelDetails;
        if (reqWith === 'username') {
            creatorChannelDetails = await Channel.findOne({ username: creatorUsernameOrId });
        }
        else {
            creatorChannelDetails = await Channel.findOne({ _id: creatorUsernameOrId });
        }

        if (!creatorChannelDetails) {
            return new Response(JSON.stringify({ message: 'Channel not found' }), { status: 404 })
        }

        const creatorUserDetails = await User.findOne({ channelId: creatorChannelDetails._id }).populate('channelId');

        return new Response(JSON.stringify({ message: 'Channel found', creatorDetails: creatorUserDetails }), { status: 200 })
    } catch (error) {
        console.log(error.message);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 })
    }
}