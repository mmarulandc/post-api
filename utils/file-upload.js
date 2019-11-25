const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const key = require("../config/secretFile");

aws.config.update({
  secretAccessKey: key.secretAccessKey,
  accessKeyId: key.secretAccessKeyId,
  region: key.region
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mmarulandc1",
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;