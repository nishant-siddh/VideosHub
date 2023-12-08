import mongoose from 'mongoose';

const commentsSchema = mongoose.Schema({
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'video', required: [true, "Please provide a videoId"] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'channel', required: [true, "Please provide a author"] },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: { type: Array, default: [] }
}, { timestamps: true })

const Comments = mongoose.models.comment || mongoose.model('comment', commentsSchema);
export default Comments;