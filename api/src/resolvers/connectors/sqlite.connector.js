import Sequelize from 'sequelize';
import { SequelizeLogger } from '../../logger/Logger';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './src/data/blog.sqlite',
  logging: SequelizeLogger,
});

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

const Author = db.models.author;
const Post = db.models.post;

export { Author, AuthorModel, Post, db };
