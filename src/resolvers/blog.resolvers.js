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
      console.log(post);
      Author.findById(post.authorId).then((author) => {
        if (!author) {
          console.log('Author with id', post.authorId, 'not founded.');
          console.log('ERRORS BEFORE:', errors.length);
          errors.push({ key: 'password', message: 'The password filed must not be empty.' });
          console.log('ERRORS AFTER:', errors.length);
        } else {
          console.log('Author', author, 'founded.');
        }
      }).then(() => {
        if (errors.length > 0) {
          console.log('THROW:', errors);
          throw new ValidationError(errors);
        }
        console.log('END');
        return post;
      });
    },
  },
};

export default blogResolver;
