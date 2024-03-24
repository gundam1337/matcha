const mongoose = require('mongoose');
const config = require('./config/database');
const app = require('./app');
const logger = require('./utils/logger');
const http = require('http'); // Required for Socket.IO
const socketIo = require('socket.io'); // Import Socket.IO

const startServer = async () => {
  try {
    await mongoose.connect(config.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB');

    // Create HTTP server from the Express app
    const httpServer = http.createServer(app);
    // Initialize Socket.IO server
    const io = socketIo(httpServer, {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://localhost:3001",
        ], // Adjust according to your security requirements
        methods: ["GET", "POST"]
      }
    });

    // Socket.IO connection handler
    io.on('connection', (socket) => {
      logger.info(`New client connected: ${socket.id}`);

      // Example of handling a custom event
      socket.on('customEvent', (data) => {
        logger.info(`Received data: ${data}`);
        // Broadcast or emit events, etc.
      });

      socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });
    });

    // Listen on the created HTTP server
    httpServer.listen(config.port, () => {
      logger.info(`Server is listening at port ${config.port}`);
    });

    // Graceful shutdown logic
    const handleExit = (signal) => {
      logger.info(`Received ${signal}. Closing server and database connection...`);
      httpServer.close(() => {
        logger.info('Server closed');
        mongoose.disconnect().then(() => {
          logger.info('Database connection closed');
          process.exit(0);
        });
      });
    };

    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
    process.on('SIGQUIT', handleExit);
  } catch (err) {
    logger.error('Error connecting to the database', err);
    process.exit(1);
  }
};

startServer();
