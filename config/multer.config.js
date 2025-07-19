const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./S3.config"); // ✅ import the actual client here

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "private",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
