import winston from 'winston';

const basePath = './logs';

const WinstonLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      filename: `${basePath}/graphql-example.log`,
    }),
  ],
  exceptionHandlers: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      filename: `${basePath}/exceptions.log`,
    }),
  ],
});

const SQLLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: `${basePath}/sequelize.log`,
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
