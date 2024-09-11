import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { NotificationFrequency } from "./libs/enums/enums.js";

class UserEntity implements Entity {
	private createdAt: string;

	private email: string;

	private id: null | number;

	private name: string;

	private notificationFrequency: ValueOf<typeof NotificationFrequency>;

	private onboardingAnswers: null | number[];

	private passwordHash: string;

	private passwordSalt: string;

	private updatedAt: string;

	private userTaskDays: null | number[];

	private constructor({
		createdAt,
		email,
		id,
		name,
		notificationFrequency,
		onboardingAnswers,
		passwordHash,
		passwordSalt,
		updatedAt,
		userTaskDays,
	}: {
		createdAt: string;
		email: string;
		id: null | number;
		name: string;
		notificationFrequency: ValueOf<typeof NotificationFrequency>;
		onboardingAnswers: null | number[];
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		userTaskDays: null | number[];
	}) {
		this.createdAt = createdAt;
		this.email = email;
		this.id = id;
		this.name = name;
		this.notificationFrequency = notificationFrequency;
		this.onboardingAnswers = onboardingAnswers;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
		this.userTaskDays = userTaskDays;
	}

	public static initialize({
		createdAt,
		email,
		id,
		name,
		notificationFrequency,
		onboardingAnswers,
		passwordHash,
		passwordSalt,
		updatedAt,
		userTaskDays,
	}: {
		createdAt: string;
		email: string;
		id: number;
		name: string;
		notificationFrequency?: ValueOf<typeof NotificationFrequency>;
		onboardingAnswers?: number[];
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		userTaskDays?: number[];
	}): UserEntity {
		return new UserEntity({
			createdAt,
			email,
			id,
			name,
			notificationFrequency:
				notificationFrequency ?? NotificationFrequency.NONE,
			onboardingAnswers: onboardingAnswers ?? null,
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
			createdAt: "",
			email,
			id: null,
			name,
			notificationFrequency: NotificationFrequency.NONE,
			onboardingAnswers: null,
			passwordHash,
			passwordSalt,
			updatedAt: "",
			userTaskDays: null,
		});
	}

	public toNewObject(): {
		createdAt: string;
		email: string;
		name: string;
		notificationFrequency: ValueOf<typeof NotificationFrequency>;
		onboardingAnswers: number[];
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		userTaskDays: number[];
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			name: this.name,
			notificationFrequency: this.notificationFrequency,
			onboardingAnswers: this.onboardingAnswers ?? [],
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			updatedAt: this.updatedAt,
			userTaskDays: this.userTaskDays ?? [],
		};
	}

	public toObject(): {
		createdAt: string;
		email: string;
		id: number;
		name: string;
		notificationFrequency: ValueOf<typeof NotificationFrequency>;
		onboardingAnswers: number[];
		updatedAt: string;
		userTaskDays: number[];
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			id: this.id as number,
			name: this.name,
			notificationFrequency: this.notificationFrequency,
			onboardingAnswers: this.onboardingAnswers ?? [],
			updatedAt: this.updatedAt,
			userTaskDays: this.userTaskDays ?? [],
		};
	}
}

export { UserEntity };
