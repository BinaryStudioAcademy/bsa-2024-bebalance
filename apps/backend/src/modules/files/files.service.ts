import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type BaseS3 } from "~/libs/modules/s3/base-s3.module.js";

import { FileEntity } from "./files.entity.js";
import { type FileRepository } from "./files.repository.js";
import { FileError } from "./libs/exceptions/exceptions.js";
import {
	createFileKey,
	createFileUrl,
	getFileKey,
} from "./libs/helpers/helpers.js";

class FileService {
	private fileRepository: FileRepository;
	private s3: BaseS3;

	public constructor(fileRepository: FileRepository, s3: BaseS3) {
		this.fileRepository = fileRepository;
		this.s3 = s3;
	}

	public async delete(fileUrl: string): Promise<boolean> {
		const fileEntity = await this.fileRepository.findByUrl(fileUrl);

		if (!fileEntity) {
			throw new FileError({
				message: ErrorMessage.FILE_DOES_NOT_EXIST,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const fileKey = getFileKey(fileEntity.toObject().url);

		await this.s3.deleteFile({
			key: fileKey,
		});

		return await this.fileRepository.delete(fileEntity.toObject().id);
	}

	public async find(fileId: number): Promise<FileEntity | null> {
		return await this.fileRepository.find(fileId);
	}

	public async findByUrl(url: string): Promise<FileEntity | null> {
		return await this.fileRepository.findByUrl(url);
	}

	public async update({
		contentType,
		fileBuffer,
		fileId,
		fileName,
	}: {
		contentType: string;
		fileBuffer: Buffer;
		fileId: number;
		fileName: string;
	}): Promise<FileEntity | null> {
		const fileToUpdate = await this.fileRepository.find(fileId);

		if (!fileToUpdate) {
			throw new FileError({
				message: ErrorMessage.FILE_DOES_NOT_EXIST,
			});
		}

		const oldFileKey = getFileKey(fileToUpdate.toObject().url);

		await this.s3.deleteFile({
			key: oldFileKey,
		});

		const fileKey = createFileKey(fileName);

		await this.s3.uploadFile({
			body: fileBuffer,
			contentType,
			key: fileKey,
		});

		const fileUrl = createFileUrl(fileKey);

		return await this.fileRepository.update(fileId, { url: fileUrl });
	}

	public async upload({
		contentType,
		fileBuffer,
		fileName,
	}: {
		contentType: string;
		fileBuffer: Buffer;
		fileName: string;
	}): Promise<FileEntity> {
		const fileKey = createFileKey(fileName);

		await this.s3.uploadFile({
			body: fileBuffer,
			contentType,
			key: fileKey,
		});

		const fileUrl = createFileUrl(fileKey);

		return await this.fileRepository.create(
			FileEntity.initializeNew({
				url: fileUrl,
			}),
		);
	}
}

export { FileService };
