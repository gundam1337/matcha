const mongoose = require('mongoose');
const config = require('./config/database');
const app = require('./app');
const logger = require('./utils/logger'); // hypothetical utility for logging

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const config = require('./webpack.config.js'); // Your webpack config file

// const app = express();
// const compiler = webpack(config);

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
// }));

// app.use(webpackHotMiddleware(compiler));

const startServer = async () => {
  try {
    await mongoose.connect(config.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB');

    const server = app.listen(config.port, () => {
      logger.info(`Server is listening at port ${config.port}`);
    });

    const handleExit = (signal) => {
      logger.info(`Received ${signal}. Closing server and database connection...`);
      server.close(() => {
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
