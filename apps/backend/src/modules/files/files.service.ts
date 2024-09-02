import { type S3Client } from "@aws-sdk/client-s3";

import { createCommand } from "~/libs/modules/bucket/bucket.js";
import { config } from "~/libs/modules/config/config.js";

import { FileEntity } from "./files.entity.js";
import { type FileRepository } from "./files.repository.js";

class FileService {
	private fileRepository: FileRepository;
	private s3Client: S3Client;

	public constructor(s3Client: S3Client, fileRepository: FileRepository) {
		this.s3Client = s3Client;
		this.fileRepository = fileRepository;
	}

	public async deleteFile(fileUrl: string): Promise<boolean> {
		const fileEntity = await this.fileRepository.findByUrl(fileUrl);

		if (!fileEntity) {
			throw new Error("File not found");
		}

		const deleteCommand = createCommand({
			commandType: "delete",
			params: {
				Key: fileEntity.toObject().fileKey,
			},
		});

		await this.s3Client.send(deleteCommand);

		return await this.fileRepository.delete(fileEntity.toObject().id);
	}

	public async getFile(fileId: number): Promise<FileEntity | null> {
		return await this.fileRepository.find(fileId);
	}

	public async uploadFile({
		contentType,
		fileBuffer,
		fileName,
	}: {
		contentType: string;
		fileBuffer: Buffer;
		fileName: string;
	}): Promise<FileEntity> {
		const fileKey = `${Date.now().toString()}-${fileName}`;

		const uploadCommand = createCommand({
			commandType: "put",
			params: {
				Body: fileBuffer,
				ContentType: contentType,
				Key: fileKey,
			},
		});

		await this.s3Client.send(uploadCommand);

		const fileUrl = `https://${config.ENV.S3_BUCKET.BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;

		return await this.fileRepository.create(
			FileEntity.initializeNew({
				fileKey,
				url: fileUrl,
			}),
		);
	}
}

export { FileService };
