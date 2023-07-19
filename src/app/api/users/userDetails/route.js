import { connect } from '@/dbConfig/dbConfig'
// import User from '@/models/userModel';
import getUserData from '@/utils/getUserData';

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const user = await getUserData({id: reqBody.param});

        return new Response(JSON.stringify({message: "User found", userData: user}), { status: 200 })
        
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}