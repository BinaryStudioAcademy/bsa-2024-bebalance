import {
	type DeleteObjectCommand,
	type DeleteObjectCommandOutput,
	type GetObjectCommand,
	type GetObjectCommandOutput,
	type PutObjectCommandOutput,
	type S3Client,
} from "@aws-sdk/client-s3";

import { BucketCommands } from "./libs/enums/enums.js";
import { createCommand } from "./libs/helpers/helpers.js";
import {
	type BucketSettings,
	type CommandParameters,
	type Parameters,
} from "./libs/types/types.js";

class BaseBucket {
	private s3Client: S3Client;
	private settings: BucketSettings;

	public constructor(s3Client: S3Client, settings: BucketSettings) {
		this.s3Client = s3Client;
		this.settings = settings;
	}

	public async deleteFile(
		parameters: Parameters,
	): Promise<DeleteObjectCommandOutput> {
		const commandParameters: CommandParameters = {
			Bucket: this.settings.Bucket,
			...parameters,
		};

		const command: DeleteObjectCommand = createCommand({
			commandType: BucketCommands.DELETE,
			parameters: commandParameters,
		});

		return await this.s3Client.send(command);
	}

	public async getFile(
		parameters: Parameters,
	): Promise<GetObjectCommandOutput> {
		const commandParameters: CommandParameters = {
			Bucket: this.settings.Bucket,
			...parameters,
		};

		const command: GetObjectCommand = createCommand({
			commandType: BucketCommands.GET,
			parameters: commandParameters,
		});

		return await this.s3Client.send(command);
	}

	public async uploadFile(
		parameters: Parameters,
	): Promise<PutObjectCommandOutput> {
		const commandParameters: CommandParameters = {
			Bucket: this.settings.Bucket,
			...parameters,
		};

		const command: DeleteObjectCommand = createCommand({
			commandType: BucketCommands.PUT,
			parameters: commandParameters,
		});

		return await this.s3Client.send(command);
	}
}

export { BaseBucket };
