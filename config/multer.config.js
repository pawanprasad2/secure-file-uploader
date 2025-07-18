const multer= require("multer")
const multerS3 =require("multer-s3")
const {S3Client} =require("@aws-sdk/client-s3")


//s3 client setup

const s3 = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})


//multer
const upload =multer({
    storage:multerS3({
        s3,
        bucket:process.env.S3_BUCKET_NAME,
        metadata:(req,file,cb)=>{
            cb(null,{fieldName:file.filename})
        },
         key: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
    }),
      limits: { fileSize: 10 * 1024 * 1024 }, // optional: 10MB limit
})

module.exports = upload;