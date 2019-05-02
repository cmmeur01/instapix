const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const jwt_decode = require('jwt-decode');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/', (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token);
  User.findOne({ _id: user.id })
    .then(user => {
    let following = user.following;
    following.push(user.id);
    User.find({ _id: { $in: following } })
      .then(users => {
        users = users.map(user => {
          user.password = '';
          return user;
        });
        res.send({ users });
      });
  }
)});

router.post('/search', (req, res) => {
 
  const searchTerm = req.body.searchTerm;
  
  User.find({ username: {$regex : '^' + searchTerm, $options : "i"}})
  .then(users => {
    users = users.map(user => {
      user.password = '';
      return user;
    });
    res.send({ users });
  });
});

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  });

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          // Throw a 400 error if the email address already exists
          return res.status(400).json({email: `Another account is using ${req.body.email}.`})
        } else {
          User.findOne({ username: req.body.username })
          .then(user => {
            if (user) {
              return res.status(400).json({ username: `Username not available` })
            } else {
              const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
              })

              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => {
                      const payload = { id: user.id, username: user.username };

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
          })
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
            const payload = {id: user.id, name: user.name};

            jwt.sign(
                payload,
                keys.secretOrKey,
                // Tell the key to expire in one hour
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
        })
      })
  })

module.exports = router;