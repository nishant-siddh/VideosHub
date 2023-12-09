import mongoose from 'mongoose';

const subscriptionSchema = mongoose.Schema({
    creatorChannel: {
        type: mongoose.Schema.Types.ObjectId, ref: 'channel',
        require: [true, "Please provide a creatorChannelId"]
    },
    subscriberChannel: {
        type: mongoose.Schema.Types.ObjectId, ref: 'channel',
        require: [true, "Please provide a userChannelId"]
    },
}, {timestamps: true})

const Subscription = mongoose.models.subscription || mongoose.model('subscription', subscriptionSchema)
export default Subscription;