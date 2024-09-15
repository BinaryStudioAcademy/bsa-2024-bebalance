import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { NotificationFrequency } from "./libs/enums/enums.js";

class UserEntity implements Entity {
	private avatarFileId: null | number;

	private avatarUrl: null | string;

	private createdAt: string;

	private email: string;

	private hasAnsweredOnboardingQuestions: boolean;

	private hasAnsweredQuizQuestions: boolean;

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
		hasAnsweredOnboardingQuestions,
		hasAnsweredQuizQuestions,
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
		hasAnsweredOnboardingQuestions: boolean;
		hasAnsweredQuizQuestions: boolean;
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
		this.hasAnsweredOnboardingQuestions = hasAnsweredOnboardingQuestions;
		this.hasAnsweredQuizQuestions = hasAnsweredQuizQuestions;
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
		hasAnsweredOnboardingQuestions,
		hasAnsweredQuizQuestions,
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
		hasAnsweredOnboardingQuestions: boolean;
		hasAnsweredQuizQuestions: boolean;
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
			hasAnsweredOnboardingQuestions,
			hasAnsweredQuizQuestions: Boolean(hasAnsweredQuizQuestions),
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
			hasAnsweredOnboardingQuestions: false,
			hasAnsweredQuizQuestions: false,
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
		hasAnsweredOnboardingQuestions: boolean;
		hasAnsweredQuizQuestions: boolean;
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
			hasAnsweredOnboardingQuestions: this.hasAnsweredOnboardingQuestions,
			hasAnsweredQuizQuestions: Boolean(this.hasAnsweredQuizQuestions),
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
		hasAnsweredOnboardingQuestions: boolean;
		hasAnsweredQuizQuestions: boolean;
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
			hasAnsweredOnboardingQuestions: this.hasAnsweredOnboardingQuestions,
			hasAnsweredQuizQuestions: Boolean(this.hasAnsweredQuizQuestions),
			id: this.id as number,
			name: this.name,
			notificationFrequency: this.notificationFrequency,
			updatedAt: this.updatedAt,
			userTaskDays: this.userTaskDays ?? [],
		};
	}
}

export { UserEntity };
