import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 80
    },
    description: {
        type: String,
        trim: true,
        minLength: 20,
        maxLength: 300
    },
    duration: {
        type: Number,
        required: true,
        trim: true
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    thumbnailUrl: {
        type: String,
        required: true,
        trim: true
    },
    uploadedBy: {
        type: String,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    comments: [{
        type: String,
        ref: 'Comment'
    }],
    meta: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 }
    },
}, { timestamps: true })

const Video = mongoose.models.video || mongoose.model('video', videoSchema);
export default Video;