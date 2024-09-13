import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { NotificationFrequency } from "./libs/enums/enums.js";

class UserEntity implements Entity {
	private avatarFileId: null | number;

	private avatarUrl: null | string;

	private createdAt: string;

	private email: string;

	private id: null | number;

	private name: string;

	private notificationFrequency: ValueOf<typeof NotificationFrequency>;

	private passwordHash: string;

	private passwordSalt: string;

	private updatedAt: string;

	private userTaskDays: null | number[];

	private constructor({
		avatarFileId,
		avatarUrl,
		createdAt,
		email,
		id,
		name,
		notificationFrequency,
		passwordHash,
		passwordSalt,
		updatedAt,
		userTaskDays,
	}: {
		avatarFileId: null | number;
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		id: null | number;
		name: string;
		notificationFrequency: ValueOf<typeof NotificationFrequency>;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		userTaskDays: null | number[];
	}) {
		this.avatarFileId = avatarFileId;
		this.avatarUrl = avatarUrl;
		this.createdAt = createdAt;
		this.email = email;
		this.id = id;
		this.name = name;
		this.notificationFrequency = notificationFrequency;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
		this.userTaskDays = userTaskDays;
	}

	public static initialize({
		avatarFileId,
		avatarUrl,
		createdAt,
		email,
		id,
		name,
		notificationFrequency,
		passwordHash,
		passwordSalt,
		updatedAt,
		userTaskDays,
	}: {
		avatarFileId: null | number;
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		id: null | number;
		name: string;
		notificationFrequency?: ValueOf<typeof NotificationFrequency>;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		userTaskDays?: number[];
	}): UserEntity {
		return new UserEntity({
			avatarFileId,
			avatarUrl,
			createdAt,
			email,
			id,
			name,
			notificationFrequency:
				notificationFrequency ?? NotificationFrequency.NONE,
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
			avatarFileId: null,
			avatarUrl: null,
			createdAt: "",
			email,
			id: null,
			name,
			notificationFrequency: NotificationFrequency.NONE,
			passwordHash,
			passwordSalt,
			updatedAt: "",
			userTaskDays: null,
		});
	}

	public toNewObject(): {
		avatarFileId: null | number;
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		name: string;
		notificationFrequency: ValueOf<typeof NotificationFrequency>;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		userTaskDays: number[];
	} {
		return {
			avatarFileId: this.avatarFileId,
			avatarUrl: this.avatarUrl,
			createdAt: this.createdAt,
			email: this.email,
			name: this.name,
			notificationFrequency: this.notificationFrequency,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			updatedAt: this.updatedAt,
			userTaskDays: this.userTaskDays ?? [],
		};
	}

	public toObject(): {
		avatarFileId: null | number;
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		id: number;
		name: string;
		notificationFrequency: ValueOf<typeof NotificationFrequency>;
		updatedAt: string;
		userTaskDays: number[];
	} {
		return {
			avatarFileId: this.avatarFileId,
			avatarUrl: this.avatarUrl,
			createdAt: this.createdAt,
			email: this.email,
			id: this.id as number,
			name: this.name,
			notificationFrequency: this.notificationFrequency,
			updatedAt: this.updatedAt,
			userTaskDays: this.userTaskDays ?? [],
		};
	}
}

export { UserEntity };
