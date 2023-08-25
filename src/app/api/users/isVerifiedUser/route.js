import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { email } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 400 })
        }

        return new Response(JSON.stringify({ message: 'User details found', userData: user }), { status: 200 })

    } catch (error) {
        console.log('error in logged in route');
    }
}