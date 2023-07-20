import { cookies } from "next/headers";

export function PUT() {
    try {
        cookies().set({
            name: 'token',
            value: '',
            path: '/',
            maxAge: -1,
            expires: new Date(),
        })
        console.log('cookies deleted');

        return new Response(JSON.stringify({ message: 'logout success' }), { status: 200 })

    } catch (error) {
        console.log('cannot delete cookies', error.message);
        return new Response(JSON.stringify({ message: 'logout failed' }), { status: 500 })
    }
}