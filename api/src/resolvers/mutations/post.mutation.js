import { Author, View } from '../connectors';
import ValidationError from '../../errors/validate.error';
import Logger from '../../logger/Logger';

const logger = Logger.WinstonLogger;

export const addPost = (post) => {
  let errors = [];
  return Author.findById(post.authorId).then((author) => {
    if (!author) {
      errors.push({ key: 'authorId', message: `Author with id ${post.authorId} not founded.` });
      logger.error(`Error adding post to author ${post.authorId}. Author with id ${post.authorId} not founded.`);
      throw new ValidationError(errors);
    } else {
      logger.info(`Author ${JSON.stringify(author)} founded. Adding new post.`);
      logger.debug(`Creating new post ${JSON.stringify(post)}`);
      return author.createPost({
        title: post.title,
        text: post.text,
      }).then((mongoDBpost) => {
        return View.update(
          { postId: mongoDBpost.id },
          { views: 0 },
          { upsert: true },
        ).then(() => {
          logger.debug(`New post added to DB: ${JSON.stringify(mongoDBpost)}`);
          return mongoDBpost;
        });
      });
    }
  });
};

export default addPost;
