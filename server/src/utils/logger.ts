import * as winston from 'winston';

const topLevel = process.env.LOG_LEVEL || 'debug';

function formatParams(info) {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');

  return `${ts} ${level} ${message} ${
    Object.keys(args).length ? JSON.stringify(args) : ''
  }`;
}

const myFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(formatParams)
);

const errorLogger = new winston.transports.File({
  level: 'error',
  format: myFormat,
  filename: './logs/error.log'
});

const combinedLogger = new winston.transports.File({
  level: topLevel,
  format: myFormat,
  filename: './logs/combined.log'
});

const devConsoleLogger = new winston.transports.Console({
  level: topLevel,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    myFormat
  ),
  handleExceptions: true
});

const prodConsoleLogger = new winston.transports.Console({
  format: myFormat,
  handleExceptions: true
});

let logger: winston.Logger;

if (process.env.NODE_ENV !== 'production') {
  logger = winston.createLogger({
    transports: [errorLogger, combinedLogger, devConsoleLogger]
  });
} else {
  logger = winston.createLogger({
    transports: [prodConsoleLogger]
  });
}

export { logger };
