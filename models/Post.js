const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Like = require('./Like');

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  description: {
    type: String
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "likes" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  imgUrl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('posts', PostSchema);
