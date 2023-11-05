const winston = require('winston');

// Define your custom levels if needed
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'grey'
  }
};

// Create the logger instance
const logger = winston.createLogger({
  levels: logLevels.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      level: 'silly', // Log everything down to 'silly' level to the console
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple() // Simple formatting for better readability in development
      )
    })
  ]
});

// If we're not in production, log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// if (process.env.NODE_ENV !== 'development') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }));
// }

// Re-configure the logger with colors for different levels
winston.addColors(logLevels.colors);

module.exports = logger;
