import jwt from 'jsonwebtoken';

const getDataFromToken = async (req) => {
    try {
        console.log('this log is from getDataFromToken');
        const encodedToken = req.cookies.get('token')?.value || "";
        console.log(encodedToken, 'encodedToken from getDataFromToken');
        const decodedToken = await jwt.verify(encodedToken, process.env.JWT_SECRET);
        return decodedToken.id;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

export default getDataFromToken;