import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { sendEmail } from '@/utils/mailer';
import axios from 'axios';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        let { channelId, name, email, password } = reqBody;

        const user = await User.findOne({ email });

        if (user) {
            return new Response(JSON.stringify({ error: 'The email you entered already exists' }), { status: 400 });
        }


        // create a channel for the user in the channel collection
        try {
            const channelRes = await axios.post('http://localhost:3000/api/channel', reqBody);
            console.log(channelRes.data.message);
            channelId = channelRes.data.channel;
            
        } catch (error) {
            console.log("Channel creation error", error.message);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }


        // hash password or encrypt password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            channelId
        })

        await newUser.save();

        // send verification email to the user 
        await sendEmail({ email, emailType: 'VERIFY', userId: newUser._id });

        return new Response(JSON.stringify({ message: "User's Channel created successfully" }), { status: 200 });

    } catch (error) {
        console.log('Error in user creation', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}