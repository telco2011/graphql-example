import schema from './schema.graphql';
import Mutation from './Mutation.graphql';
import Query from './Query.graphql';
import Author from './Author.graphql';
import Post from './Post.graphql';
import PostInput from './PostInput.graphql';

const typeDefs = [
  schema,
  Mutation,
  Query,
  PostInput,
  Author,
  Post
];

export default typeDefs;
