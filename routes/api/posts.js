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
       let postsObject = {};
       posts.forEach(post => postsObject[post._id] = post)
       res.send({ posts: postsObject });
     });
     
  }) ;
});

router.post('/like', (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
 
  Post.findOne({ _id: postId })
  .then(post => {
    User.findOne({ _id: userId })
    .then(user => {
      user.likes.push(post._id);
      user.save();
      post.likes.push(user._id);
      post.save();
      res.send({post});
    });
  });
});

router.patch('/unlike', (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;

  User.findOne({ _id: userId })
    .then(user => {

      for (let i = 0; i < user.likes.length; i++) {
        if (user.likes[i] == postId) {
          user.likes.splice(i, 1);
        }
      }
      user.save();
    })
    .then(() => {
      Post.findOne({ _id: postId }).then(post => {
        for (let i = 0; i < post.likes.length; i++) {
          if (post.likes[i] == userId) {
            post.likes.splice(i, 1);
          }
        }
        post.save();
        res.send({post});
      });
    });

});

module.exports = router;