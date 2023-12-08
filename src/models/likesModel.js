import mongoose from 'mongoose';

const likesSchema = mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'video',
        require: [true, "Please provide a videoId"]
    },
    userChannelId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        require: [true, "Please provide a userId"]
    },
    isLike: {
        type: Boolean,
    },
    
}, { timestamps: true })

const Likes = mongoose.models.like || mongoose.model('like', likesSchema);
export default Likes;