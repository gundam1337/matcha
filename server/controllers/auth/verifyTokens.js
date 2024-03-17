const jwt = require("jsonwebtoken");
const User = require("../../models/user");
require('dotenv').config({ path: './config.env' });

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;


function verifyTokens(req, res, next) {
  // console.log("req headers : ",req.headers)
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies.refreshToken;

  // console.log("accessToken = ",accessToken)
  // console.log("accessToken =",refreshToken)
  //if the token is not there send error messages
  if (!accessToken) {
    return res.status(403).send({ message: "Access Token is required" });
  }
  if (!refreshToken) {
    return res.status(403).send({ message: "Refresh Token is required" });
  }

  // Verify Access Token
  jwt.verify(accessToken, accessTokenSecret, async (err, user) => {
    if (err) {
      // Access Token is invalid or expired, verify Refresh Token
      jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: "Invalid Refresh Token" });
        }

        try {
          // Find user by decoded username or email
          const foundUser = await User.findOne({
            $or: [{ username: decoded.username }, { email: decoded.email }],
          });

          // Check if the found user's refresh token matches the provided one
          if (!foundUser || foundUser.refreshToken !== refreshToken) {
            return res.status(403).send({ message: "Invalid Refresh Token" });
          }

          // Refresh Token is valid, generate new Access Token
          const newAccessToken = jwt.sign(
            { username: decoded.username, email: decoded.email },
            accessTokenSecret,
            { expiresIn: "10m" }
          );

          // Attach new Access Token to the request, but don't send it yet
          req.newAccessToken = newAccessToken;
          req.user = decoded;
          req.userID = foundUser.userID;
          next();
        } catch (error) {
          return res.status(500).send({ message: "Internal Server Error" });
        }
      });
    } else {
      try {
        // Find user by decoded username or email
        const foundUser = await User.findOne({
          $or: [{ username: user.username }, { email: user.email }],
        });

        // Check if the found user's refresh token matches the provided one
        if (!foundUser || foundUser.refreshToken !== refreshToken) {
          return res.status(403).send({ message: "Invalid Refresh Token" });
        }

        req.user = user;
        req.userID = foundUser.userID;
        next();
      } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
      }
    }
  });
}

module.exports = verifyTokens;
