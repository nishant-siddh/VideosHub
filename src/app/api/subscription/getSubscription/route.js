import { connect } from '@/dbConfig/dbConfig'
import Channel from '@/models/channelsDetailsModel';
import Subscription from '@/models/subscriptionModel';

connect();

export async function POST(req) {
    const { creatorChannel, subscriberChannel } = await req.json();
    try {
        const subscribedVideos = await Subscription.findOne({ creatorChannel, subscriberChannel });
        if (subscribedVideos) {
            return new Response(JSON.stringify({ message: 'Already subscribed', subscriptionStatus: true }), { status: 200 });
        }
        
        return new Response(JSON.stringify({ message: 'Not subscribed', subscriptionStatus: false }), { status: 200 });
    } catch (error) {
        console.log(error.message);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 })
    }
}