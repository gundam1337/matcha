const jwt = require('jsonwebtoken');
//TODO read this two from the .env 
const accessTokenSecret = 'yourAccessTokenSecret'; // Replace with your actual secret
const refreshTokenSecret = 'yourRefreshTokenSecret'; // Replace with your actual secret

function verifyTokens(req, res, next) {
    const accessToken = req.headers['x-access-token'];
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
        return res.status(403).send({ message: 'Access Token is required' });
    }

    if (!refreshToken) {
        return res.status(403).send({ message: 'Refresh Token is required' });
    }

    // Verify Access Token
    jwt.verify(accessToken, accessTokenSecret, (err, user) => {
        if (err) {
            // Access Token is invalid or expired, verify Refresh Token
            jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
                if (err) {
                    // Refresh Token is invalid
                    return res.status(403).send({ message: 'Invalid Refresh Token' });
                }

                // Refresh Token is valid, generate new Access Token
                const newAccessToken = jwt.sign(
                    { username: user.username },
                    accessTokenSecret,
                    { expiresIn: '10m' }
                );

                // Attach new Access Token to the request, but don't send it yet
                req.newAccessToken = newAccessToken;
                next();
            });
        } else {
            // Access Token is valid, proceed
            req.user = user;
            next();
        }
    });
}



module.exports = verifyTokens;