import { Author, Post, View, FortuneCookie } from './connectors';
import Logger from '../logger/Logger';

import { addPost } from './mutations';

const logger = Logger.WinstonLogger;

const blogResolver = {
  Query: {
    authors() {
      logger.debug('Get all authors.');
      return Author.findAll();
    },
    posts() {
      logger.debug('Get all posts');
      return Post.findAll();
    },
    author(_, args) {
      logger.debug(`Finiding author with arguments ${JSON.stringify(args)}`);
      return Author.find({ where: args });
    },
    getFortunerCookie() {
      logger.debug('Calling fortune cookie.');
      return FortuneCookie.getOne();
    },
  },
  Author: {
    posts(author) {
      logger.debug(`Getting posts for the author: ${JSON.stringify(author)}`);
      return author.getPosts();
    },
  },
  Post: {
    author(post) {
      logger.debug(`Getting author for post ${JSON.stringify(post)}`);
      return post.getAuthor();
    },
    views(post) {
      logger.debug(`Getting views for post ${JSON.stringify(post)}`);
      return View.findOne({ postId: post.id }).then((view) => { return view.views; });
    },
  },
  Mutation: {
    createPost(_, { post }) {
      logger.info(`Creating new post => ${JSON.stringify(post)}`);
      return addPost(post);
    },
  },
};

export default blogResolver;
