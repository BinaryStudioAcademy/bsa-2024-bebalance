import { type Repository } from "~/libs/types/types.js";

import { FileEntity } from "./files.entity.js";
import { type FileModel } from "./files.model.js";

class FileRepository implements Repository {
	private fileModel: typeof FileModel;

	public constructor(fileModel: typeof FileModel) {
		this.fileModel = fileModel;
	}

	public async create(entity: FileEntity): Promise<FileEntity> {
		const { url } = entity.toNewObject();

		const file = await this.fileModel
			.query()
			.insert({
				url,
			})
			.returning("*");

		return FileEntity.initialize({
			createdAt: file.createdAt,
			id: file.id,
			updatedAt: file.updatedAt,
			url: file.url,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedRows = await this.fileModel.query().deleteById(id);

		return Boolean(deletedRows);
	}

	public async find(id: number): Promise<FileEntity | null> {
		const file = await this.fileModel.query().findById(id);

		return file
			? FileEntity.initialize({
					createdAt: file.createdAt,
					id: file.id,
					updatedAt: file.updatedAt,
					url: file.url,
				})
			: null;
	}

	public async findAll(): Promise<FileEntity[]> {
		const files = await this.fileModel.query();

		return files.map((file) =>
			FileEntity.initialize({
				createdAt: file.createdAt,
				id: file.id,
				updatedAt: file.updatedAt,
				url: file.url,
			}),
		);
	}

	public async findByUrl(fileUrl: string): Promise<FileEntity | null> {
		const [file] = await this.fileModel.query().where({
			url: fileUrl,
		});

		return file
			? FileEntity.initialize({
					createdAt: file.createdAt,
					id: file.id,
					updatedAt: file.updatedAt,
					url: file.url,
				})
			: null;
	}

	public async update(
		id: number,
		updateData: Partial<FileModel>,
	): Promise<FileEntity | null> {
		const file = await this.fileModel.query().patchAndFetchById(id, updateData);

		return FileEntity.initialize({
			createdAt: file.createdAt,
			id: file.id,
			updatedAt: file.updatedAt,
			url: file.url,
		});
	}
}

export { FileRepository };
