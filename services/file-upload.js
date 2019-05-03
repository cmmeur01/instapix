const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const keys = require('../config/keys');

aws.config.update({
  secretAccessKey: keys.AWS.secretAccessKey,
  accessKeyId: keys.AWS.accessKeyId,
  region: keys.AWS.region
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'instapic-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;