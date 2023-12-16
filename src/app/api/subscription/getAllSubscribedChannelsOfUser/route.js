import { connect } from '@/dbConfig/dbConfig'
import Subscription from '@/models/subscriptionModel';
import User from '@/models/userModel';

connect();

export async function POST(req) {
    const { subscriberChannel } = await req.json();
    try {
        // let subscriptionArray = [];
        const subscriptionDetails = await Subscription.find({ subscriberChannel })

        if (!subscriptionDetails) {
            return new Response(JSON.stringify({ message: 'No subscribed channel found' }), { status: 200 })
        }

        const subscriptionArray = await Promise.all(subscriptionDetails.map(async (subscription) => {
            try {
                const userDetail = await User.findOne({ channelId: subscription.creatorChannel }).populate('channelId', 'username profilePicture');
                return userDetail
            } catch (error) {
                console.log(error);
            }
        }))

        return new Response(JSON.stringify({ message: 'Subscribed channels found', subscribedChannelsByUser: subscriptionArray }), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 })
    }
}