import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    // userId: {
    //     type: String,
    //     require: [true, "Please provide a user id"],
    //     unique: true
    // },
    username: {
        type: String,
        require: [true, "Please provide a username"],
        unique: true
    },
    channelDescription: {
        type: String,
        require: [true, "Please provide a channel description"]
    },
    totalSubscribers: {
        type: Number,
        default: 0
    },
    profilePicture: {
        type: String,
        default: ""
    },
    channelViews: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const Channel = mongoose.models.channels || mongoose.model('channels', Schema);
export default Channel;