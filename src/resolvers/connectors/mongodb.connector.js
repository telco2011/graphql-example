import Mongoose from 'mongoose';

const databaseName = process.env.MONGODB_DATABASE_NAME;

// mongodb real connection
// const mongodbURL = 'mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${databaseName}';

// mongodb in-memory connection
const mongodbURL = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${databaseName}`;

Mongoose.connect(mongodbURL);

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('view', ViewSchema);

export default View;
