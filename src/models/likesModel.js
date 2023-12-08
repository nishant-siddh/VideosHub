import mongoose from 'mongoose';

const likesSchema = mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'videos',
        require: [true, "Please provide a videoId"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        require: [true, "Please provide a userId"]
    },
    isLike: {
        type: Boolean,
    },
    
}, { timestamps: true })

const Likes = mongoose.models.like || mongoose.model('like', likesSchema);
export default Likes;