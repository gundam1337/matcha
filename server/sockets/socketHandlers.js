const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const handleSocketConnection = require("../routes/handleSocketConnection");
const logger = require("../utils/logger");

const initializeSocketIO = (httpServer) => {
  const io = socketIo(httpServer, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001"], // Adjust according to your security requirements
      methods: ["GET", "POST"],
    },
  });

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  io.use((socket, next) => {
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
  });

  io.on("connection", (socket) => {
    logger.info(`New client connected: ${socket.id}`);

    handleSocketConnection(socket);
    
    socket.on("disconnect", () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = initializeSocketIO;

