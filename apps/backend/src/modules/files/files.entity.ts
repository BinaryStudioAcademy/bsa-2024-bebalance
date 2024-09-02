import { type Entity } from "~/libs/types/types.js";

class FileEntity implements Entity {
	private createdAt: string;

	private fileKey: string;

	private id: null | number;

	private updatedAt: string;

	private url: string;

	private constructor({
		createdAt,
		fileKey,
		id,
		updatedAt,
		url,
	}: {
		createdAt: string;
		fileKey: string;
		id: null | number;
		updatedAt: string;
		url: string;
	}) {
		this.id = id;
		this.fileKey = fileKey;
		this.url = url;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		fileKey,
		id,
		updatedAt,
		url,
	}: {
		createdAt: string;
		fileKey: string;
		id: number;
		updatedAt: string;
		url: string;
	}): FileEntity {
		return new FileEntity({
			createdAt,
			fileKey,
			id,
			updatedAt,
			url,
		});
	}

	public static initializeNew({
		fileKey,
		url,
	}: {
		fileKey: string;
		url: string;
	}): FileEntity {
		return new FileEntity({
			createdAt: "",
			fileKey,
			id: null,
			updatedAt: "",
			url,
		});
	}

	public toNewObject(): {
		createdAt: string;
		fileKey: string;
		updatedAt: string;
		url: string;
	} {
		return {
			createdAt: this.createdAt,
			fileKey: this.fileKey,
			updatedAt: this.updatedAt,
			url: this.url,
		};
	}

	public toObject(): {
		createdAt: string;
		fileKey: string;
		id: number;
		updatedAt: string;
		url: string;
	} {
		return {
			createdAt: this.createdAt,
			fileKey: this.fileKey,
			id: this.id as number,
			updatedAt: this.updatedAt,
			url: this.url,
		};
	}
}

export { FileEntity };
