import { connect } from '@/dbConfig/dbConfig'
import Channel from '@/models/channelsDetailsModel';
import Subscription from '@/models/subscriptionModel';

connect();

export async function POST(req) {
    const { creatorChannel, subscriberChannel } = await req.json();
    try {
        const subscribedVideos = await Subscription.findOne({ creatorChannel, subscriberChannel });
        const videoCreatorChannel = await Channel.findById({_id: creatorChannel});
        if (subscribedVideos) {
            await Subscription.deleteOne({ creatorChannel, subscriberChannel });

            videoCreatorChannel.totalSubscribers = videoCreatorChannel.totalSubscribers - 1;
            await videoCreatorChannel.save();

            return new Response(JSON.stringify({ message: 'Unsubscribed successfully', subscriptionStatus: false }), { status: 200 });
        }
        await Subscription.create({
            creatorChannel,
            subscriberChannel
        })

        videoCreatorChannel.totalSubscribers = videoCreatorChannel.totalSubscribers + 1;
        await videoCreatorChannel.save();

        return new Response(JSON.stringify({ message: 'Subscribed successfully', subscriptionStatus: true }), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 })
    }
}