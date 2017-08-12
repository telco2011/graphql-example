import dotenv from 'dotenv';
import winston from 'winston';

// Load environment variables
dotenv.load();

const basePath = process.env.LOG_BASE_PATH || './logs';
const defaultLogLevel = 'error';

const WinstonLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: process.env.STANDARD_LOG_LEVEL || defaultLogLevel }),
    new (winston.transports.File)({
      filename: `${basePath}/graphql-example.log`,
      level: process.env.STANDARD_LOG_LEVEL || defaultLogLevel,
    }),
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ level: process.env.STANDARD_LOG_LEVEL || defaultLogLevel }),
    new (winston.transports.File)({
      filename: `${basePath}/graphql-exceptions.log`,
      level: process.env.EXCEPTION_LOG_LEVEL || defaultLogLevel,
    }),
  ],
});

const SQLLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: `${basePath}/sequelize.log`,
      level: process.env.SEQUELIZE_LOG_LEVEL || defaultLogLevel,
    }),
  ],
});

const Logger = {
  WinstonLogger,
  logPath: basePath,
};

export const SequelizeLogger = (msg) => {
  SQLLogger.info(msg);
};

export default Logger;
