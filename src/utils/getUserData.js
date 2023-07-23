import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'

connect();

const getUserData = async (req) => {
    try {
        const user = await User.findById(req.id).select("-password");
        return user;
    } catch (error) {
        console.log('error in getUserData');
        throw new Error(error.message);
    }
}

export default getUserData;