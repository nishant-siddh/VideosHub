import mongoose from 'mongoose';

const repliesSchema = mongoose.Schema({
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'comment', required: [true, "Please provide a commentId"] },
    replyTo: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'channel', required: [true, "Please provide a author"] },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })

const Replies = mongoose.models.commentReplies || mongoose.model('commentReplies', repliesSchema);
export default Replies;