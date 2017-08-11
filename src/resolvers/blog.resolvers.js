import { Author, View, FortuneCookie } from './connectors';
import ValidationError from '../errors/validate.error';

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
      let errors = [];
      return Author.findById(post.authorId).then((author) => {
        if (!author) {
          errors.push({ key: 'authorId', message: `Author with id ${post.authorId} not founded.` });
          throw new ValidationError(errors);
        } else {
          console.log(`Author ${JSON.stringify(author)} founded.`);
          return author.createPost({
            title: post.title,
            text: post.text,
          }).then((mongoDBpost) => {
            return View.update(
              { postId: mongoDBpost.id },
              { views: 0 },
              { upsert: true },
            ).then(() => {
              return mongoDBpost;
            });
          });
        }
      });
    },
  },
};

export default blogResolver;
