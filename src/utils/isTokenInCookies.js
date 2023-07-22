const isTokenInCookies = (req) => {
    try {
        console.log('this log is from isTokenInCookies');
        const hasToken = req.cookies.get('token');
        console.log(hasToken, 'hasToken from cookies in isTokenInCookies.js');
        return Boolean(hasToken);
        
    } catch (error) {
        console.log(error.message, 'cannot get token from cookies');
        return false;
    }
}

export default isTokenInCookies;