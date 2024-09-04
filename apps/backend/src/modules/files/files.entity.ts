import { type Entity } from "~/libs/types/types.js";

class FileEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private updatedAt: string;

	private url: string;

	private constructor({
		createdAt,
		id,
		updatedAt,
		url,
	}: {
		createdAt: string;
		id: null | number;
		updatedAt: string;
		url: string;
	}) {
		this.id = id;
		this.url = url;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		id,
		updatedAt,
		url,
	}: {
		createdAt: string;
		id: number;
		updatedAt: string;
		url: string;
	}): FileEntity {
		return new FileEntity({
			createdAt,
			id,
			updatedAt,
			url,
		});
	}

	public static initializeNew({ url }: { url: string }): FileEntity {
		return new FileEntity({
			createdAt: "",
			id: null,
			updatedAt: "",
			url,
		});
	}

	public toNewObject(): {
		createdAt: string;
		updatedAt: string;
		url: string;
	} {
		return {
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			url: this.url,
		};
	}

	public toObject(): {
		createdAt: string;
		id: number;
		updatedAt: string;
		url: string;
	} {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			updatedAt: this.updatedAt,
			url: this.url,
		};
	}
}

export { FileEntity };
