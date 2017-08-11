import Mongoose from 'mongoose';

// mongodb real connection
// const mongodbURL = 'mongodb://localhost/views';

// mongodb in-memory connection
const mongodbURL = 'mongodb://localhost:8000/myMongoInMemory';

Mongoose.connect(mongodbURL);

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('view', ViewSchema);

export default View;
