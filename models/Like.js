const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'posts',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Like = mongoose.model('likes', LikeSchema);
