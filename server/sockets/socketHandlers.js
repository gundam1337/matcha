const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");


const connectedUsers = new Map();

const handleSocketConnection = require("../routes/handleSocketConnection");
const logger = require("../utils/logger");
const handleChatMessage = require("../controllers/messaging/handleChatMessage")

const initializeSocketIO = (httpServer) => {
  const io = socketIo(httpServer, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001"], // Adjust according to your security requirements
      methods: ["GET", "POST"],
    },
  });

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  //NOTE : This middleware function is used to authenticate socket connections in a Socket.IO application.

  /*io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    jwt.verify(
      token,
      accessTokenSecret,
      { ignoreExpiration: true },
      (err, decoded) => {
        if (err) return next(new Error("Authentication error"));

        socket.decoded = decoded;
        next();
      }
    );
   });*/

  io.on("connection", (socket) => {
    logger.info(`New client connected: ${socket.id}`);

    //this part is for testing 
    const username = socket.handshake.query.username;
    console.log(`User ${username} connected with socket ID ${socket.id}`);

    // Store the username in the socket object for later use
    socket.join(username);
    //this is for the notification system
    handleSocketConnection(socket);
    
    //create a one for the message
    handleChatMessage(socket,io)

    socket.on("disconnect", () => {
      //
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = initializeSocketIO;

