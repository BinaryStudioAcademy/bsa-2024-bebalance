import { type ContentType, ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type BaseS3 } from "~/libs/modules/s3/s3.js";
import { type ValueOf } from "~/libs/types/types.js";

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
		buffer,
		contentType,
		fileId,
		key,
	}: {
		buffer: Buffer;
		contentType: ValueOf<typeof ContentType>;
		fileId: number;
		key: string;
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

		const fileKey = createFileKey(key);

		await this.s3.uploadFile({
			buffer,
			contentType,
			key,
		});

		const fileUrl = createFileUrl(fileKey);

		return await this.fileRepository.update(fileId, { url: fileUrl });
	}

	public async upload({
		buffer,
		contentType,
		key,
	}: {
		buffer: Buffer;
		contentType: ValueOf<typeof ContentType>;
		key: string;
	}): Promise<FileEntity> {
		const fileKey = createFileKey(key);

		await this.s3.uploadFile({
			buffer,
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
