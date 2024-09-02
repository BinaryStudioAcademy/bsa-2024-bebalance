import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private avatarUrl: string;

	private createdAt: string;

	private email: string;

	private id: null | number;

	private name: string;

	private passwordHash: string;

	private passwordSalt: string;

	private updatedAt: string;

	private constructor({
		avatarUrl,
		createdAt,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		avatarUrl: string;
		createdAt: string;
		email: string;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}) {
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
		avatarUrl,
		createdAt,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		avatarUrl: string;
		createdAt: string;
		email: string;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}): UserEntity {
		return new UserEntity({
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
			avatarUrl: "",
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
		avatarUrl: string;
		createdAt: string;
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	} {
		return {
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
		avatarUrl: string;
		createdAt: string;
		email: string;
		id: number;
		name: string;
		updatedAt: string;
	} {
		return {
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
