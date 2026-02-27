const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.AWS_BUCKET_NAME;
const CLOUDFRONT = process.env.CLOUDFRONT_URL.replace(/\/$/, "");

// exports.uploadImage = async (file) => {
//   if (!file) return { image: "", imageKey: "" };

//   const key = `members/${Date.now()}-${file.originalname}`;

//   const command = new PutObjectCommand({
//     Bucket: BUCKET,
//     Key: key,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//   });

//   await s3.send(command);

//   return {
//     image: `${CLOUDFRONT}/${key}`,
//     imageKey: key,
//   };
// }; -------> old
exports.uploadImage = async (file, folder = "general") => {
  if (!file) return { image: "", imageKey: "" };

  const key = `${folder}/${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return {
    image: `${CLOUDFRONT}/${key}`,
    imageKey: key,
  };
};

exports.deleteImage = async (key) => {
  if (!key) return;

  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  await s3.send(command);
};