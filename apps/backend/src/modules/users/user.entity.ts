import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private avatarFileId: null | number;

	private avatarUrl: null | string;

	private createdAt: string;

	private email: string;

	private id: null | number;

	private name: string;

	private passwordHash: string;

	private passwordSalt: string;

	private updatedAt: string;

	private constructor({
		avatarFileId,
		avatarUrl,
		createdAt,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		avatarFileId: null | number;
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}) {
		this.avatarFileId = avatarFileId;
		this.avatarUrl = avatarUrl;
		this.createdAt = createdAt;
		this.id = id;
		this.email = email;
		this.name = name;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		avatarFileId,
		avatarUrl,
		createdAt,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		avatarFileId: null | number;
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}): UserEntity {
		return new UserEntity({
			avatarFileId,
			avatarUrl,
			createdAt,
			email,
			id,
			name,
			passwordHash,
			passwordSalt,
			updatedAt,
		});
	}

	public static initializeNew({
		email,
		name,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			avatarFileId: null,
			avatarUrl: null,
			createdAt: "",
			email,
			id: null,
			name,
			passwordHash,
			passwordSalt,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		avatarFileId: null | number;
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	} {
		return {
			avatarFileId: this.avatarFileId,
			avatarUrl: this.avatarUrl,
			createdAt: this.createdAt,
			email: this.email,
			name: this.name,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		avatarFileId: null | number;
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		id: number;
		name: string;
		updatedAt: string;
	} {
		return {
			avatarFileId: this.avatarFileId,
			avatarUrl: this.avatarUrl,
			createdAt: this.createdAt,
			email: this.email,
			id: this.id as number,
			name: this.name,
			updatedAt: this.updatedAt,
		};
	}
}

export { UserEntity };
