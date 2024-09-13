import { ZERO_INDEX } from "~/libs/constants/constants.js";
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

	private onboardingAnswers: null | number[];

	private passwordHash: string;

	private passwordSalt: string;

	private quizAnswers: null | number[];

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
		onboardingAnswers,
		passwordHash,
		passwordSalt,
		quizAnswers,
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
		onboardingAnswers: null | number[];
		passwordHash: string;
		passwordSalt: string;
		quizAnswers: null | number[];
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
		this.onboardingAnswers = onboardingAnswers;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.quizAnswers = quizAnswers;
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
		onboardingAnswers,
		passwordHash,
		passwordSalt,
		quizAnswers,
		updatedAt,
		userTaskDays,
	}: {
		avatarFileId: null | number;
		avatarUrl: null | string;
		createdAt: string;
		email: string;
		hasAnsweredOnboardingQuestions?: boolean;
		hasAnsweredQuizQuestions?: boolean;
		id: null | number;
		name: string;
		notificationFrequency?: ValueOf<typeof NotificationFrequency>;
		onboardingAnswers?: number[];
		passwordHash: string;
		passwordSalt: string;
		quizAnswers?: number[];
		updatedAt: string;
		userTaskDays?: number[];
	}): UserEntity {
		return new UserEntity({
			avatarFileId,
			avatarUrl,
			createdAt,
			email,
			hasAnsweredOnboardingQuestions: Boolean(
				onboardingAnswers && onboardingAnswers.length > ZERO_INDEX,
			),
			hasAnsweredQuizQuestions: Boolean(
				quizAnswers && quizAnswers.length > ZERO_INDEX,
			),
			id,
			name,
			notificationFrequency:
				notificationFrequency ?? NotificationFrequency.NONE,
			onboardingAnswers: onboardingAnswers ?? null,
			passwordHash,
			passwordSalt,
			quizAnswers: quizAnswers ?? null,
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
			onboardingAnswers: null,
			passwordHash,
			passwordSalt,
			quizAnswers: null,
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
			hasAnsweredOnboardingQuestions: Boolean(
				this.onboardingAnswers && this.onboardingAnswers.length > ZERO_INDEX,
			),
			hasAnsweredQuizQuestions: Boolean(
				this.quizAnswers && this.quizAnswers.length > ZERO_INDEX,
			),
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
			hasAnsweredOnboardingQuestions: Boolean(
				this.onboardingAnswers && this.onboardingAnswers.length > ZERO_INDEX,
			),
			hasAnsweredQuizQuestions: Boolean(
				this.quizAnswers && this.quizAnswers.length > ZERO_INDEX,
			),
			id: this.id as number,
			name: this.name,
			notificationFrequency: this.notificationFrequency,
			updatedAt: this.updatedAt,
			userTaskDays: this.userTaskDays ?? [],
		};
	}
}

export { UserEntity };
