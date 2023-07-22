export function isTokenInCookies(req) {
    try {
        const hasToken = req.cookies.get('token');
        return Boolean(hasToken);
        
    } catch (error) {
        console.log(error.message, 'cannot get token from cookies');
        return false;
    }
}