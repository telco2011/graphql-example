import dotenv from 'dotenv';
import Mongoose from 'mongoose';
import Logger from '../../logger/Logger';

const logger = Logger.MongoDBLogger;

dotenv.load();

const databaseName = process.env.MONGODB_DATABASE_NAME;

const mongodbURL = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${databaseName}`;

const mongoServerOptions = {
  server: {
    connectTimeoutMS: 3000,
    reconnectTries: 5,
    reconnectInterval: 1000,
  },
};

Mongoose.connection.on('connected', () => {
  logger.info('Mongoose connected to database.');
});

Mongoose.connect(mongodbURL, mongoServerOptions);

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('view', ViewSchema);

export default View;
