import { Author, View, FortuneCookie } from './connectors';
import ValidationError from '../errors/validate.error';

import { addPost } from './mutations';

const blogResolver = {
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    getFortunerCookie() {
      return FortuneCookie.getOne();
    },
  },
  Author: {
    posts(author) {
      return author.getPosts();
    },
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
    views(post) {
      return View.findOne({ postId: post.id }).then((view) => { return view.views; });
    },
  },
  Mutation: {
    createPost(_, { post }) {
      return addPost(post);
    },
  },
};

export default blogResolver;
