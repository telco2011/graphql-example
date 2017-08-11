import casual from 'casual';
import _ from 'lodash';

import View from './mongodb.connector';
import { Author, AuthorModel, Post, db } from './sqlite.connector';
import { FortuneCookie } from './rest.connector';

casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((author) => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      }).then((post) => {
        return View.update(
          { postId: post.id },
          { views: casual.integer(0, 100) },
          { upsert: true },
        );
      });
    });
  });
});

export { Author, Post, View, FortuneCookie };
