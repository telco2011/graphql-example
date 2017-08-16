import dotenv from 'dotenv';
import winston from 'winston';
import path from 'path';
import packageJson from '../../package.json';

// Load environment variables
dotenv.load();

const basePath = ((process.env.LOG_BASE_PATH || './logs') !== './logs' && path.isAbsolute(process.env.LOG_BASE_PATH)) ? process.env.LOG_BASE_PATH : process.env.LOG_BASE_PATH || './logs';
const defaultLogLevel = 'error';

const WinstonLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: process.env.STANDARD_LOG_LEVEL || defaultLogLevel }),
    new (winston.transports.File)({
      filename: `${basePath}/${packageJson.name}-application.log`,
      level: process.env.STANDARD_LOG_LEVEL || defaultLogLevel,
    }),
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ level: process.env.STANDARD_LOG_LEVEL || defaultLogLevel }),
    new (winston.transports.File)({
      filename: `${basePath}/${packageJson.name}-exceptions.log`,
      level: process.env.EXCEPTION_LOG_LEVEL || defaultLogLevel,
    }),
  ],
});

const MongoDBLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: process.env.STANDARD_LOG_LEVEL || defaultLogLevel }),
    new (winston.transports.File)({
      filename: `${basePath}/${packageJson.name}-mongodb.log`,
      level: process.env.STANDARD_LOG_LEVEL || defaultLogLevel,
    }),
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ level: process.env.STANDARD_LOG_LEVEL || defaultLogLevel }),
    new (winston.transports.File)({
      filename: `${basePath}/${packageJson.name}-exceptions.log`,
      level: process.env.EXCEPTION_LOG_LEVEL || defaultLogLevel,
    }),
  ],
});

const SQLLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: `${basePath}/${packageJson.name}-sequelize.log`,
      level: process.env.SEQUELIZE_LOG_LEVEL || defaultLogLevel,
    }),
  ],
});

const Logger = {
  WinstonLogger,
  MongoDBLogger,
  logPath: basePath,
};

export const SequelizeLogger = (msg) => {
  SQLLogger.info(msg);
};

export default Logger;
