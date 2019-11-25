const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const key = require('../config/secretFile');
const https = require('https');

aws.config.update({
  secretAccessKey: key.secretAccessKey,
  accessKeyId: key.secretAccessKeyId,
  region: key.region,
  httpOptions: {
    agent: new https.Agent({ rejectUnauthorized: false })
  }
});

const s3 = new aws.S3();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Extensión de archivo invalida, sólo JPEG and PNG'), false);
  }
};
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'mmarulandc1',
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
