const express = require("express");
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const passport = require('passport');
const jwt_decode = require('jwt-decode');

router.get("/", (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token);
  User.findOne({ _id: user.id })
  .then(user => {  
     let following = user.following;
     following.push(user.id);
     Post.find({ user: { $in: following }}).sort([['date', -1]])
     .then(posts => {
       res.send({ posts });
     });
     
  }) ;
});

module.exports = router;