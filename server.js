// Environment imports
import dotenv from 'dotenv';

// Apollo imports
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { printSchema } from 'graphql';

// Middleware imports
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

// Utils imports
import fs from 'fs';
import path from 'path';
import PrettyError from 'pretty-error';
import printRoutes from './src/utils/document';

// Application imports
import schema from './src/index';
import Logger from './src/logger/Logger';

import MongoInMemory from './src/data/in-memory-db/mongodb.in-memory';

const logger = Logger.WinstonLogger;

MongoInMemory.start();

// Load environment variables
dotenv.load();

// Assign environment constants
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// Load express
const graphQLServer = express();

// Express server configuration
graphQLServer.use(
  cors({
    origin(origin, cb) {
      const whitelist = CORS_ORIGIN ? CORS_ORIGIN.split(',') : [];
      cb(null, whitelist.includes(origin));
    },
    credentials: true,
  }),
);
graphQLServer.use(cookieParser());
graphQLServer.use(bodyParser.urlencoded({ extended: true }));
graphQLServer.use(bodyParser.json());
graphQLServer.use(morgan('combined', { stream: (fs.createWriteStream(path.join(__dirname, Logger.logPath, 'access.log'), { flags: 'a' })) }));

// Express Middleware configuration
graphQLServer.get('/graphql/schema', (req, res) => {
  res.type('text/plain').send(printSchema(schema));
});

// Express Apollo configuration
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

// Start Express server
graphQLServer.listen(GRAPHQL_PORT, () => {
  logger.info(`GraphQL is now running on http://localhost:${GRAPHQL_PORT}/graphql`);
  logger.info(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);
  printRoutes(graphQLServer);
});

// Utilities
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

graphQLServer.use((err, req, res, next) => {
  process.stderr.write(pe.render(err));
  next();
});
// Shutdown Node.js app gracefully
function handleExit() {
  MongoInMemory.stop();
}

process.on('exit', handleExit.bind());
process.on('SIGINT', handleExit.bind());
