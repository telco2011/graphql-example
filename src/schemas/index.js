import schema from './schema.graphql';
//import Mutation from './Mutation.graphql';
import Query from './Query.graphql';
import Author from './Author.graphql';
import Post from './Post.graphql';

const typeDefs = [
  schema,
  //Mutation,
  Query,
  Author,
  Post,
];

export default typeDefs;
