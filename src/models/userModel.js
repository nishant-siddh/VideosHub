import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a username"]
    },
    email: {
        type: String,
        require: [true, "Please provide a email"], 
        unique: true
    },
    password: {
        type: String,
        require: [true, "Please provide a password"]
    },
    channelId: {
        type: String,
        require: [true, "Please provide a channelId"],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    
}, { timestamps: true })

const User = mongoose.models.user || mongoose.model('user', userSchema);
export default User;