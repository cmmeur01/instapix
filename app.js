const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");
const images = require("./routes/api/images");
// const FakeDB = require('./seed-db');


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  // .then(() => {
  //   if (process.env.NODE_ENV != 'production') {
  //     console.log('here');

  //     FakeDB();

  //   }
  // })
  .catch(err => console.log(err));

// const url = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_URI}`;

// mongoose.connect(url).then(() => {
//   if (process.env.NODE_ENV != 'production') {
//     fakeDB.seed();
//   }
// });

app.get("/", (req, res) => res.send("Hello World!!"));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/users/images", images);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
