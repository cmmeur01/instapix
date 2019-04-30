const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./Post');


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
      required: true
    },
    bio: {
      type: String
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
    date: {
      type: Date,
      default: Date.now
    }
  });

module.exports = User = mongoose.model('users', UserSchema);



