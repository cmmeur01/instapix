const User = require("./models/User");
const bcrypt = require('bcryptjs');
const faker = require("faker");
const Post = require('./models/Post');
const db = require("./config/keys").mongoURI;

// const config = require('./config');


// function FakeDB() {
//   let array = [];
//   while (array.length < 100) {
//     let ban = false;
//     let n = faker.name.findName();
//     const newUser = new User({
//       username: n,
//       name: n,
//       email: faker.internet.email(),
//       password: "123456"
//     });

//     userEmail = User.findOne({ email: newUser.email });
//     userUsername = User.findOne({ username: newUser.username });

//     User.findOne({ email: newUser.email })
//       .then(user => {
//         if (user) ban = true;
//       });

//     User.findOne({ username: newUser.username })
//       .then(user => {
//         if (user) ban = true;
//       });

//     if (ban) continue;

//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) throw err;
//         newUser.password = hash;
//         newUser.save()
//       });
//     });

//     array.push(newUser);
//   }
// }


// module.exports = FakeDB;


function FakeDB() {

  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
  // Set the region 
  AWS.config.update({ region: 'us-west-2' });

  // Create S3 service object
  s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  // Create the parameters for calling listObjects
  var bucketParams = {
    Bucket: "instapic-images"
  };

  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      let array = [];
      data.Contents.forEach(element => {
        let url = ('https://s3.amazonaws.com/instapic-images/' + element.Key);
        array.push(url);
      });


      let userArray = [];

      User.find({}, function (err, users) {
        users.forEach(function (user) {
          userArray.push(user);
        });
      })
      // .then ( () => {
      //   console.log(userArray)
      //   userArray.forEach(user => {
      //     let count = Math.floor(Math.random() * 10) + 1;
      //     for (let i = 0; i < count; i++) {
      //       let newPost = new Post({
      //         user: user,
      //         imgUrl: array[Math.floor(Math.random() * 490)],
      //         description: faker.lorem.sentence(),
      //       });
      //       user.posts.push(newPost);
      //       newPost.save();
      //     }
      //     user.save();
      //   });
      //   }
      // );



    }
  });

}




module.exports = FakeDB;



