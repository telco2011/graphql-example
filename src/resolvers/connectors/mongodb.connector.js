import Mongoose from 'mongoose';
import casual from 'casual';

const mongo = Mongoose.connect('mongodb://localhost/views');

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('view', ViewSchema);

export { View };
