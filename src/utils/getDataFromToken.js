import jwt from 'jsonwebtoken';

const getDataFromToken = async (req) => {
    try {
        const encodedToken = req.cookies.get('token')?.value || "";
        const decodedToken = await jwt.verify(encodedToken, process.env.JWT_SECRET);
        return decodedToken.id;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

export default getDataFromToken;