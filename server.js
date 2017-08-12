import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { printSchema } from 'graphql';
import bodyParser from 'body-parser';
import schema from './src/index';
import Logger from './src/logger/Logger';

// mongodb in-memory connection
// only in DEV environment
import MongoInMemory from 'mongo-in-memory';

const logger = Logger.WinstonLogger;

const mongoInMemoryServer = new MongoInMemory(process.env.MONGO_IN_MEMORY_PORT || 8000);
mongoInMemoryServer.start((error, config) => {
  if (error) {
    logger.error(`Error starting mongoInMemoryServer ${error}`);
  } else {
    logger.info(`MONGO-IN-MEMORY-URL: ${mongoInMemoryServer.getMongouri('myMongoInMemory')}`);
  }
});

// Load environment variables
dotenv.load();

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3000;

const graphQLServer = express();

graphQLServer.use(morgan('combined', { stream: (fs.createWriteStream(path.join(__dirname, Logger.logPath, 'access.log'), { flags: 'a' })) }));

graphQLServer.get('/graphql/schema', (req, res) => {
  res.type('text/plain').send(printSchema(schema));
});

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress(({
  schema,
  formatError: error => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path,
  }),
})));
graphQLServer.use('/graphiql', graphiqlExpress(({ endpointURL: '/graphql' })));

graphQLServer.listen(GRAPHQL_PORT, () => logger.info(
  `GraphQL is now running on http://localhost:${GRAPHQL_PORT}/graphql`,
  `\nGraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`,
));

// Shutdown Node.js app gracefully
function handleExit() {
  logger.warn('Closing mongoInMemoryServer.');
  mongoInMemoryServer.stop((error) => {
    if (error) {
      logger.error(`Error stopping mongoInMemoryServer ${error}`);
    } else {
      process.exit();
    }
  });
}

process.on('exit', handleExit.bind());
