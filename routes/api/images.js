const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const upload = require('../../services/file-upload');
const singleUpload = upload.single('image');


//aws route to upload picture / get image link
router.post('/upload', function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
    }
    return res.json({ 'imageUrl': req.file.location });
  });
});


module.exports = router;