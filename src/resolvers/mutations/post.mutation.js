import { Author, View } from '../connectors';
import ValidationError from '../../errors/validate.error';

export const addPost = (post) => {
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
};

export default addPost;
