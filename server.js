import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { printSchema } from 'graphql';
import bodyParser from 'body-parser';
import schema from './src/index';

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

graphQLServer.get('/graphql/schema', (req, res) => {
  res.type('text/plain').send(printSchema(schema));
});

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  formatError: error => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path,
  }),
})));
graphQLServer.use('/graphiql', graphiqlExpress(req => ({
  formatError: error => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path,
  }),
  endpointURL: '/graphql',
})));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL is now running on http://localhost:${GRAPHQL_PORT}/graphql`,
  `\nGraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`,
));
