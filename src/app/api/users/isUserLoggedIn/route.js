import isTokenInCookies from "@/utils/isTokenInCookies";

export async function GET(req) {
    try {
        console.log('this log is from isLoggedIn');
        const hasToken = await isTokenInCookies(req);
        console.log(hasToken, 'hasToken from isLoggedIn');
        return new Response((hasToken), {status: 200});

    } catch (error) {
        console.log(error.message, 'cannot get token from cookies');
        return new Response(JSON.stringify({ error: error.message }));
    }
}