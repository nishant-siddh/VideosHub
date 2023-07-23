import { cookies } from "next/headers";

export async function GET() {
    try {
        const hasToken = cookies().get('token');
        return new Response(Boolean(hasToken), {status: 200});

    } catch (error) {
        console.log(error.message, 'cannot get token from cookies');
        return new Response(JSON.stringify({ error: error.message }));
    }
}

export const dynamic = 'force-dynamic'