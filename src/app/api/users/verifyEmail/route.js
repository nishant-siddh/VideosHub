import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400 });
        }

        console.log(user, 'user in verify email route');

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return new Response(JSON.stringify({ message: 'Email verified successfully' }), { status: 200 });
        
    } catch (error) {
        console.log('Error in verify email route', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}