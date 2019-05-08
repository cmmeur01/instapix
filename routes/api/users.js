const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const Post = require('./../../models/Post');

const jwt_decode = require('jwt-decode');


const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// SENDS ONLY CURRENT USER AND FOLLOWINGS 
// router.get('/', (req, res) => {
//   const token = req.headers.authorization;
//   const user = jwt_decode(token);
//   User.findOne({ _id: user.id })
//     .then(user => {
//     let following = user.following;
//     following.push(user.id);
//     User.find({ _id: { $in: following } })
//       .then(users => {
//         users = users.map(user => {
//           user.password = '';
//           return user;
//         });
//         res.send({ users });
//       });
//     }
//   );
// });

// SENDS ALL USERS
router.get('/', (req, res) => {
  User.find({})
  .then(users => {
    let hash = {};
    users.forEach(user => {
      user.password = '';
      hash[user.id] = user;
    });
    res.send(hash);
  }
)});

//send whole user back to redirect
router.patch('/edit', (req, res) => {
  // console.log(req.body);
  User.findOne({ _id: req.body.id })
    .then( user => {
      user.image_url = req.body.image_url;
      // console.log(user);
      user.save()
        .then(res.send({ [user.id]: user }));
    });
});

router.patch('/username', (req, res) => {
  let user1;
  // console.log(req);
  User.findOne({_id: req.body.user._id})
    .then(user => {

      for (let i = 0; i < user.following.length; i++) {
        if (user.following[i] == req.body.id) {
          user.following.splice(i, 1);
          // console.log(user.following);
        }
      }
      user.save();
      user1 = user;
      // res.send(user.following);
    })
    .then( () => {
      User.findOne({_id: req.body.id}).then(user => {
        for (let i = 0; i < user.followers.length; i++) {
          if (user.followers[i] == req.body.user._id) {
            user.followers.splice(i, 1);
          }
        }
        user.save();
        res.send({following: user1.following, followers: user.followers});
      });
   });
});

router.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  User.find({ username: { $regex: '^' + searchTerm, $options: "i" } }).sort([['username', 1]])
  .then(users => {
    users = users.map(user => {
      user.password = '';
      return user;
    });
    res.send({ users });
  });
});

router.post('/username', (req, res) => {
  // console.log(req.body.user._id);
  let user1;
  User.findOne({ _id: req.body.user._id })
    .then(user => {
      user.following.push(req.body.id);
      user.save();
      user1 = user;
      // res.send(user.following);
    })
    .then( () => {
      User.findOne({_id: req.body.id})
      .then( user => {
        user.followers.push(user1._id);
        user.save();
        res.send({ following: user1.following, followers: user.followers });
      });
    });
});


router.get('/current', (req, res) => {
  User.findOne({ _id: req.query.id })
  // .populate({ path: 'posts', options: { sort: { "date": -1 } } })
    .then(user => {
      let currentUser = user;
      User.findOne({ username: req.query.username })
      // .populate({ path: 'posts', options: { sort: { "date": -1 } } })
      // .populate('posts')
      .then( user => {
        if (user) {
            let posts = user.posts;
            res.send({ [currentUser.id]: currentUser, [user.id]: user });
        } else {
          res.send({ [currentUser.id]: currentUser });
        }
      }
      );
    }
  );
});


router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          return res.status(400).json({email: `Another account is using ${req.body.email}.`});
        } else {
          User.findOne({ username: req.body.username })
          .then(user => {
            if (user) {
              return res.status(400).json({ username: `Username not available` });
            } else {
              const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
              });

              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => {
                      const payload = { 
                        id: user.id, 
                        username: user.username, 
                        image_url: user.image_url, 
                        name: user.name
                      };
                      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        res.json({
                          success: true,
                          token: "Bearer " + token
                        });
                      });
                    })
                    .catch(err => console.log(err));
                });
              });
            }
          });
        }
      });
  });


  router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    console.log(errors);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;
  
    User.findOne({username})
      .then(user => {
        if (!user) {
          return res.status(404).json({username: 'This user does not exist'});
        }
  
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
            const payload = {
              id: user.id,
              username: user.username,
              image_url: user.image_url,
              name: user.name
            };

            jwt.sign(
                payload,
                keys.secretOrKey,

                {expiresIn: 3600},
                (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
              });
            } else {
                return res.status(400).json({password: 'Incorrect password'});
            }
        });
      });
  });

module.exports = router;