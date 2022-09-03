import AWS from "aws-sdk";
import "dotenv/config";

async function s3Upload(file) {
  try {
    const s3 = new AWS.S3();

    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `blogImages/${file.originalname}`,
      Body: file.buffer,
    };
    const data = await s3.upload(param).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { s3Upload };
