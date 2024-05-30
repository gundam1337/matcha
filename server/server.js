const mongoose = require("mongoose");
const config = require("./config/database");
const app = require("./app");
const logger = require("./utils/logger");
const http = require("http"); // Required for Socket.IO
const socketIo = require("socket.io"); // Import Socket.IO
const handleSocketConnection = require("./routes/handleSocketConnection");
const jwt = require("jsonwebtoken");

// Initialize Socket.IO server
const initializeSocketIO = require("../server/sockets/socketHandlers");



require("dotenv").config({ path: "./config.env" });
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const startServer = async () => {
  try {
    //connect to DB
    await mongoose.connect(config.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB");

    // Create HTTP server from the Express app
    const httpServer = http.createServer(app);

    //NOTE:  Initialize Socket.IO server
    initializeSocketIO(httpServer);

    // Listen on the created HTTP server
    httpServer.listen(config.port, () => {
      logger.info(`Server is listening at port ${config.port}`);
    });

    // Graceful shutdown logic
    const handleExit = (signal) => {
      logger.info(
        `Received ${signal}. Closing server and database connection...`
      );
      httpServer.close(() => {
        logger.info("Server closed");
        mongoose.disconnect().then(() => {
          logger.info("Database connection closed");
          process.exit(0);
        });
      });
    };

    process.on("SIGINT", handleExit);
    process.on("SIGTERM", handleExit);
    process.on("SIGQUIT", handleExit);
  } catch (err) {
    logger.error("Error connecting to the database", err);
    process.exit(1);
  }
};

startServer();
