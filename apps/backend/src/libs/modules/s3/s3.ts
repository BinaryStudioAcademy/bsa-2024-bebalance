import { config } from "../config/config.js";
import { BaseS3 } from "./base-s3.module.js";

const s3 = new BaseS3({
	accessKeyId: config.ENV.S3_BUCKET.BUCKET_ACCESS_KEY,
	bucketName: config.ENV.S3_BUCKET.BUCKET_NAME,
	region: config.ENV.S3_BUCKET.BUCKET_REGION,
	secretAccessKey: config.ENV.S3_BUCKET.SECRET_ACCESS_KEY,
});

export { type BaseS3 } from "./base-s3.module.js";
export { s3 };
