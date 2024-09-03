import { S3Client } from "@aws-sdk/client-s3";

import { config } from "~/libs/modules/config/config.js";

import { FileModel } from "./files.model.js";
import { FileRepository } from "./files.repository.js";
import { FileService } from "./files.service.js";

const s3Client = new S3Client({
	credentials: {
		accessKeyId: config.ENV.S3_BUCKET.BUCKET_ACCESS_KEY,
		secretAccessKey: config.ENV.S3_BUCKET.SECRET_ACCESS_KEY,
	},
	region: config.ENV.S3_BUCKET.BUCKET_REGION,
});

const fileRepository = new FileRepository(FileModel);
const fileService = new FileService(s3Client, fileRepository);

export { fileService };
export { FileEntity } from "./files.entity.js";
export { type FileService } from "./files.service.js";
export { FileError } from "./libs/exceptions/exceptions.js";
