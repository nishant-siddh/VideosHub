export async function GET(req) {
    try {
        const hasToken = req.cookies.get('token');
        console.log(Boolean(hasToken), 'hasToken from isLoggedIn route');
        return new Response(Boolean(hasToken), {status: 200});

    } catch (error) {
        console.log(error.message, 'cannot get token from cookies');
        return new Response(JSON.stringify({ error: error.message }));
    }
}