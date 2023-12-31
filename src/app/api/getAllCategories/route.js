import {connect} from '@/dbConfig/dbConfig';
import Categories from '@/models/categoriesModel'

connect()

export async function GET() {
    try {
        const categories = await Categories.find({});
        return new Response(JSON.stringify({message: 'Categories found', categories}), {status: 200})
    } catch (error) {
        console.log(error.message);
        return new Response(JSON.stringify({ message: error.message }), { status: 500 })
    }
}