const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      // select: false
    },
    bio: {
      type: String
    },
    image_url: {
      type: String,
      required: true,
      default: 'https://66.media.tumblr.com/d136cd5a19ac53bc5bd06c2deb91e52b/tumblr_pqs5kovMCM1vud73ko1_400.jpg'
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
    date: {
      type: Date,
      default: Date.now
    }
  });

module.exports = User = mongoose.model('users', UserSchema);



