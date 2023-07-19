import getDataFromToken from '@/utils/getDataFromToken'

export async function GET(req) {
    try {
        const userId = await getDataFromToken(req);

        return new Response(userId, { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 })
    }
}