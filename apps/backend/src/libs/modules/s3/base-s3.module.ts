import {
	DeleteObjectCommand,
	type DeleteObjectCommandOutput,
	PutObjectCommand,
	type PutObjectCommandOutput,
	S3Client,
} from "@aws-sdk/client-s3";

import {
	type CommandParameters,
	type FileParameters,
	type S3Settings,
} from "./libs/types/types.js";

class BaseS3 {
	private s3Client: S3Client;
	private settings: S3Settings;

	public constructor(settings: S3Settings) {
		this.s3Client = new S3Client({
			credentials: {
				accessKeyId: settings.accessKeyId,
				secretAccessKey: settings.secretAccessKey,
			},
			region: settings.region,
		});
		this.settings = settings;
	}

	public async deleteFile(
		parameters: FileParameters,
	): Promise<DeleteObjectCommandOutput> {
		const commandParameters: CommandParameters = {
			Bucket: this.settings.bucketName,
			...parameters,
		};

		const command = new DeleteObjectCommand({
			...commandParameters,
		});

		return await this.s3Client.send(command);
	}

	public async uploadFile(
		parameters: FileParameters,
	): Promise<PutObjectCommandOutput> {
		const commandParameters: CommandParameters = {
			Bucket: this.settings.bucketName,
			...parameters,
		};

		const command = new PutObjectCommand({
			...commandParameters,
		});

		return await this.s3Client.send(command);
	}
}

export { BaseS3 };
