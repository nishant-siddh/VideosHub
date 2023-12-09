import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 80
    },
    description: {
        type: String,
        trim: true,
        maxLength: 300
    },
    duration: {
        type: Number,
        trim: true
    },
    videoId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    thumbnailId: {
        type: String,
    },
    thumbnailUrl: {
        type: String,
    },
    videoStatus: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    uploadedBy: {
        type: String,
        ref: 'Channel',
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    meta: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 }
    },
}, { timestamps: true })

const Video = mongoose.models.video || mongoose.model('video', videoSchema);
export default Video;