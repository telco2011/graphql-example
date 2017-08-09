import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './src/index';

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL is now running on http://localhost:${GRAPHQL_PORT}/graphql`,
  `\nGraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`,
));
