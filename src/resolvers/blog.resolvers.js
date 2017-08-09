import { Author, View, FortuneCookie } from './connectors';

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
      return View.findOne({ postId: post.id })
            .then((view) => view.views);
    },
  },
  Mutation: {
    createPost(_, { post }) {
      console.log(post);
      Author.findById(post.authorId).then((author) => {
        if (!author) {
          console.log('Author with id', post.authorId, 'not founded.');
        } else {
          console.log('Author', author, 'founded.');
        }
      });
      return post;
    },
  },
};

export default blogResolver;
