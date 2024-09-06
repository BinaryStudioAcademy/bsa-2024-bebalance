import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private allowNotifications: string;

	private createdAt: string;

	private email: string;

	private id: null | number;

	private name: string;

	private passwordHash: string;

	private passwordSalt: string;

	private updatedAt: string;

	private userTaskDays: null | number[];

	private constructor({
		allowNotifications,
		createdAt,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
		updatedAt,
		userTaskDays,
	}: {
		allowNotifications: string;
		createdAt: string;
		email: string;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		userTaskDays: null | number[];
	}) {
		this.allowNotifications = allowNotifications;
		this.createdAt = createdAt;
		this.id = id;
		this.email = email;
		this.name = name;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
		this.userTaskDays = userTaskDays;
	}

	public static initialize({
		allowNotifications,
		createdAt,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
		updatedAt,
		userTaskDays,
	}: {
		allowNotifications?: string;
		createdAt: string;
		email: string;
		id: number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		userTaskDays?: number[];
	}): UserEntity {
		return new UserEntity({
			allowNotifications: allowNotifications ?? "false",
			createdAt,
			email,
			id,
			name,
			passwordHash,
			passwordSalt,
			updatedAt,
			userTaskDays: userTaskDays ?? null,
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
			allowNotifications: "false",
			createdAt: "",
			email,
			id: null,
			name,
			passwordHash,
			passwordSalt,
			updatedAt: "",
			userTaskDays: null,
		});
	}

	public toNewObject(): {
		allowNotifications: string;
		createdAt: string;
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		userTaskDays: number[];
	} {
		return {
			allowNotifications: this.allowNotifications,
			createdAt: this.createdAt,
			email: this.email,
			name: this.name,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			updatedAt: this.updatedAt,
			userTaskDays: this.userTaskDays ?? [],
		};
	}

	public toObject(): {
		allowNotifications: string;
		createdAt: string;
		email: string;
		id: number;
		name: string;
		updatedAt: string;
		userTaskDays: number[];
	} {
		return {
			allowNotifications: this.allowNotifications,
			createdAt: this.createdAt,
			email: this.email,
			id: this.id as number,
			name: this.name,
			updatedAt: this.updatedAt,
			userTaskDays: this.userTaskDays ?? [],
		};
	}
}

export { UserEntity };
