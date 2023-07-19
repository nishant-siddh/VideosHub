import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        cookies().set('token', token, {
            httpOnly: true,
        })

        return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });


    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}