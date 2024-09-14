import {
	DeleteObjectCommand,
	type DeleteObjectCommandOutput,
	PutObjectCommand,
	type PutObjectCommandOutput,
	S3Client,
} from "@aws-sdk/client-s3";

import { type UploadedFile } from "~/modules/files/files.js";

import { type CommandParameters } from "./libs/types/types.js";

type Constructor = {
	accessKeyId: string;
	bucketName: string;
	region: string;
	secretAccessKey: string;
};

class BaseS3 {
	private bucketName: string;
	private s3Client: S3Client;

	public constructor(settings: Constructor) {
		this.s3Client = new S3Client({
			credentials: {
				accessKeyId: settings.accessKeyId,
				secretAccessKey: settings.secretAccessKey,
			},
			region: settings.region,
		});
		this.bucketName = settings.bucketName;
	}

	public async deleteFile(key: string): Promise<DeleteObjectCommandOutput> {
		const commandParameters: CommandParameters = {
			bucket: this.bucketName,
			key,
		};

		const command = new DeleteObjectCommand({
			Bucket: commandParameters.bucket,
			Key: commandParameters.key,
		});

		return await this.s3Client.send(command);
	}

	public async uploadFile(
		parameters: UploadedFile,
	): Promise<PutObjectCommandOutput> {
		const commandParameters: CommandParameters = {
			bucket: this.bucketName,
			...parameters,
		};

		const command = new PutObjectCommand({
			Body: commandParameters.buffer as Buffer,
			Bucket: commandParameters.bucket,
			ContentType: commandParameters.contentType as string,
			Key: commandParameters.key,
		});

		return await this.s3Client.send(command);
	}
}

export { BaseS3 };
