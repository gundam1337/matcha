function verifyTokens(req, res, next) {
    // Assuming the access token is sent in the header as 'x-access-token'
    const accessToken = req.headers['x-access-token'];
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
        return res.status(403).send({ message: 'Access Token is required' });
    }

    if (!refreshToken) {
        return res.status(403).send({ message: 'Refresh Token is required' });
    }

    console.log("accessToken : ",accessToken)
    console.log("refreshToken : ",refreshToken)

    // Here you would add your logic to validate the tokens.
    // If valid, call next() to proceed to the setProfile middleware
    // If not valid, redirect to the login page or send an error response

    // For this example, let's assume the tokens are valid
    next();
}

module.exports = verifyTokens;