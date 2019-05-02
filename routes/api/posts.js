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
          // console.log(user.following);
        }
      }
      user.save();

      // res.send(user.following);
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


// router.post('/username', (req, res) => {
//   // console.log(req.body.user._id);
//   let user1;
//   User.findOne({ _id: req.body.user._id })
//     .then(user => {
//       user.following.push(req.body.id);
//       user.save();
//       user1 = user;
//       // res.send(user.following);
//     })
//     .then(() => {
//       User.findOne({ _id: req.body.id })
//         .then(user => {
//           user.followers.push(user1._id);
//           user.save();
//           res.send({ following: user1.following, followers: user.followers });
//         });
//     });
// }); `
module.exports = router;