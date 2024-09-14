import { config } from "~/libs/modules/config/config.js";

const createFileUrl = (fileKey: string): string => {
	return `https://${config.ENV.S3_BUCKET.BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
};

export { createFileUrl };
