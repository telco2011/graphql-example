import { merge } from 'lodash';
import blogResolver from './blog.resolvers';

const resolvers = merge(blogResolver);

export default resolvers;
