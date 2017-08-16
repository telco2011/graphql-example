import Logger from '../../logger/Logger';
import MongoInMemory from 'mongo-in-memory';

const logger = Logger.WinstonLogger;

let mongoInMemoryObj = '';

const MongoInMemoryServer = {
  start: (port) => {
    return new Promise((resolve, reject) => {
      logger.info(`Initialazing mongoInMemoryServer on port ${port}`);
      mongoInMemoryObj = new MongoInMemory(port);
      logger.info('Starting mongoInMemoryServer');
      mongoInMemoryObj.start().then((response) => {
        if (response.host) {
          logger.info(`MONGO-IN-MEMORY-URL: ${mongoInMemoryObj.getMongouri('myMongoInMemory')}`);
          resolve(true);
        } else {
          logger.error(`Error starting mongoInMemoryServer ${JSON.stringify(response)}`);
          reject(false);
        }
      });
    });
  },
  stop: () => {
    logger.info('Closing mongoInMemoryServer.');
    mongoInMemoryObj.stop().then((error) => {
      if (error) {
        logger.error(`Error stopping mongoInMemoryServer ${error}`);
      } else {
        process.exit();
      }
    });
  },
};

export default MongoInMemoryServer;
