import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private createdAt: string;

	private email: string;

	private id: null | number;

	private name: string;

	private passwordHash: string;

	private passwordSalt: string;

	private updatedAt: string;

	private constructor({
		createdAt,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		createdAt: string;
		email: string;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.email = email;
		this.name = name;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		createdAt: string;
		email: string;
		id: number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}): UserEntity {
		return new UserEntity({
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
		createdAt: string;
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			name: this.name,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		createdAt: string;
		email: string;
		id: number;
		name: string;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			id: this.id as number,
			name: this.name,
			updatedAt: this.updatedAt,
		};
	}
}

export { UserEntity };
