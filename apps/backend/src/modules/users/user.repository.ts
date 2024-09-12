import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { type OnboardingAnswerModel } from "../onboarding/onboarding.js";
import { type QuizAnswerModel } from "../quiz-answers/quiz-answers.js";
import { type UserTaskDay } from "./libs/types/types.js";
import { type UserDetailsModel } from "./user-details.model.js";
import { type UserTaskDaysModel } from "./user-task-days.model.js";

class UserRepository implements Repository {
	private userDetailsModel: typeof UserDetailsModel;

	private userModel: typeof UserModel;

	private userTaskDaysModel: typeof UserTaskDaysModel;

	public constructor(
		userModel: typeof UserModel,
		userDetailsModel: typeof UserDetailsModel,
		userTaskDaysModel: typeof UserTaskDaysModel,
	) {
		this.userModel = userModel;
		this.userDetailsModel = userDetailsModel;
		this.userTaskDaysModel = userTaskDaysModel;
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const { email, name, passwordHash, passwordSalt } = entity.toNewObject();

		const user = await this.userModel
			.query()
			.insert({
				email,
				passwordHash,
				passwordSalt,
			})
			.returning("*");

		const userDetails = await this.userDetailsModel
			.query()
			.insert({
				name,
				userId: user.id,
			})
			.returning("*");

		return UserEntity.initialize({
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: userDetails.name,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const rowsDeleted = await this.userModel.query().deleteById(id);

		return Boolean(rowsDeleted);
	}

	public async deleteUserTaskDays(userId: number): Promise<boolean> {
		const rowsDeleted = await this.userTaskDaysModel
			.query()
			.delete()
			.where({ userId });

		return Boolean(rowsDeleted);
	}

	public async find(id: number): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}, ${RelationName.ONBOARDING_USER_ANSWERS}, ${RelationName.QUIZ_USER_ANSWERS}]`,
			)
			.findById(id);

		return user
			? UserEntity.initialize({
					createdAt: user.createdAt,
					email: user.email,
					id: user.id,
					name: user.userDetails.name,
					notificationFrequency: user.userDetails.notificationFrequency,
					onboardingAnswers: user.onboardingAnswers.map(
						(onboardingAnswer: OnboardingAnswerModel) => onboardingAnswer.id,
					),
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					quizAnswers: user.quizAnswers.map(
						(quizAnswers: QuizAnswerModel) => quizAnswers.id,
					),
					updatedAt: user.updatedAt,
					userTaskDays: user.userTaskDays.map(
						(taskDay: UserTaskDay) => taskDay.dayOfWeek,
					),
				})
			: null;
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel
			.query()
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}, ${RelationName.ONBOARDING_USER_ANSWERS}, ${RelationName.QUIZ_USER_ANSWERS}]`,
			);

		return users.map((user) =>
			UserEntity.initialize({
				createdAt: user.createdAt,
				email: user.email,
				id: user.id,
				name: user.userDetails.name,
				notificationFrequency: user.userDetails.notificationFrequency,
				onboardingAnswers: user.onboardingAnswers.map(
					(onboardingAnswer: OnboardingAnswerModel) => onboardingAnswer.id,
				),
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				quizAnswers: user.quizAnswers.map(
					(quizAnswers: QuizAnswerModel) => quizAnswers.id,
				),
				updatedAt: user.updatedAt,
				userTaskDays: user.userTaskDays.map(
					(taskDay: UserTaskDay) => taskDay.dayOfWeek,
				),
			}),
		);
	}

	public async findByEmail(email: string): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.where({ email })
			.first()
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}, ${RelationName.ONBOARDING_USER_ANSWERS}, ${RelationName.QUIZ_USER_ANSWERS}]`,
			);

		return user
			? UserEntity.initialize({
					createdAt: user.createdAt,
					email: user.email,
					id: user.id,
					name: user.userDetails.name,
					notificationFrequency: user.userDetails.notificationFrequency,
					onboardingAnswers: user.onboardingAnswers.map(
						(onboardingAnswer: OnboardingAnswerModel) => onboardingAnswer.id,
					),
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					quizAnswers: user.quizAnswers.map(
						(quizAnswers: QuizAnswerModel) => quizAnswers.id,
					),
					updatedAt: user.updatedAt,
					userTaskDays: user.userTaskDays.map(
						(taskDay: UserTaskDay) => taskDay.dayOfWeek,
					),
				})
			: null;
	}

	public async update(
		id: number,
		payload: Partial<UserDetailsModel>,
	): Promise<null | UserEntity> {
		const userDetails = await this.userDetailsModel
			.query()
			.findOne({ userId: id });
		const updatedUserDetails = await userDetails
			?.$query()
			.patchAndFetch(payload);
		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphFetched(RelationName.USER_TASK_DAYS);

		return user && updatedUserDetails
			? UserEntity.initialize({
					createdAt: user.createdAt,
					email: user.email,
					id: user.id,
					name: updatedUserDetails.name,
					notificationFrequency: updatedUserDetails.notificationFrequency,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
					userTaskDays: user.userTaskDays.map(
						(taskDay: UserTaskDay) => taskDay.dayOfWeek,
					),
				})
			: null;
	}

	public async updatePassword(
		id: number,
		passwordPayload: { passwordHash: string; passwordSalt: string },
	): Promise<UserEntity> {
		const user = await this.userModel
			.query()
			.withGraphFetched(RelationName.USER_DETAILS)
			.patchAndFetchById(id, passwordPayload);

		return UserEntity.initialize({
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.userDetails.name,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
		});
	}

	public async updateUserTaskDays(
		id: number,
		userTaskDays: number[],
	): Promise<void> {
		await this.deleteUserTaskDays(id);

		await this.userTaskDaysModel.query().insert(
			userTaskDays.map((day) => {
				return { dayOfWeek: day, userId: id };
			}),
		);
	}
}

export { UserRepository };
