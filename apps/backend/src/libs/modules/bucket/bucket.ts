import { S3Client } from "@aws-sdk/client-s3";

import { config } from "../config/config.js";
import { BaseBucket } from "./base-bucket.module.js";

const s3Client = new S3Client({
	credentials: {
		accessKeyId: config.ENV.S3_BUCKET.BUCKET_ACCESS_KEY,
		secretAccessKey: config.ENV.S3_BUCKET.SECRET_ACCESS_KEY,
	},
	region: config.ENV.S3_BUCKET.BUCKET_REGION,
});

const bucket = new BaseBucket(s3Client, {
	Bucket: config.ENV.S3_BUCKET.BUCKET_NAME,
});

export { bucket };
export { BucketCommands } from "./libs/enums/enums.js";
export { createCommand } from "./libs/helpers/create-bucket-command.helper.js";
