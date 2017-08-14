import Logger from '../../logger/Logger';
import MongoInMemory from 'mongo-in-memory';

const logger = Logger.WinstonLogger;

class MongoInMemoryServer {
  constructor() {
    this.mongoInMemoryServer = new MongoInMemory(process.env.MONGO_IN_MEMORY_PORT || 8000);
  }

  start() {
    this.mongoInMemoryServer.start().then((response) => {
      if (response.host) {
        logger.info(`MONGO-IN-MEMORY-URL: ${this.mongoInMemoryServer.getMongouri('myMongoInMemory')}`);
      } else {
        logger.error(`Error starting mongoInMemoryServer ${JSON.stringify(response)}`);
      }
    });
  }

  stop() {
    logger.info('Closing mongoInMemoryServer.');
    this.mongoInMemoryServer.stop().then((error) => {
      if (error) {
        logger.error(`Error stopping mongoInMemoryServer ${error}`);
      } else {
        process.exit();
      }
    });
  }
}

export default MongoInMemoryServer;
