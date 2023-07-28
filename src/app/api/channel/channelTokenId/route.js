import getDataFromToken from '@/utils/getDataFromToken'

export async function GET(req) {
    console.log('channelTokenId route', req);
    try {
        const channelId = await getDataFromToken(req);

        return new Response(channelId, { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 })
    }
}