const jwt = require("jsonwebtoken");
//FIXME read this two from the .env
//FIXME : add another layer of securty ,by checking the DB is the user is aleardy exist 
//FIXME : verify if the refrech tokon is the same in the database 
const accessTokenSecret = "yourAccessTokenSecret"; // Replace with your actual secret
const refreshTokenSecret = "yourRefreshTokenSecret"; // Replace with your actual secret

function verifyTokens(req, res, next) {
  const accessToken = req.headers["x-access-token"];
  const refreshToken = req.cookies.refreshToken;

  //if the token is not there send error messages
  if (!accessToken) {
    return res.status(403).send({ message: "Access Token is required" });
  }
  if (!refreshToken) {
    return res.status(403).send({ message: "Refresh Token is required" });
  }

  // Verify Access Token
  jwt.verify(accessToken, accessTokenSecret, (err, user) => {
    if (err) {
      // Access Token is invalid or expired, verify Refresh Token

      jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
        if (err) {
          // Refresh Token is invalid
          return res.status(403).send({ message: "Invalid Refresh Token" });
        }

        // Refresh Token is valid, generate new Access Token
        const newAccessToken = jwt.sign(
          { username: user.username ,email: user.email },
          accessTokenSecret,
          { expiresIn: "10m" }
        );
        // Attach new Access Token to the request, but don't send it yet
        req.newAccessToken = newAccessToken;
       
        req.user = user;
        next();
      });
    } else {

      console.log("req.user in the virfy 2:",req.user)
      req.user = user;
      next();
    }
  });
}

module.exports = verifyTokens;
