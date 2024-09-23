import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { CategoryModel } from "../categories/categories.js";
import { OnboardingAnswerModel } from "../onboarding/onboarding.js";
import { QuizAnswerModel } from "../quiz-answers/quiz-answer.model.js";
import { TaskModel } from "../tasks/tasks.js";
import { UserDetailsModel } from "./user-details.model.js";
import { UserTaskDaysModel } from "./user-task-days.model.js";

class UserModel extends AbstractModel {
	public email!: string;

	public onboardingAnswers!: OnboardingAnswerModel[];

	public passwordHash!: string;

	public passwordSalt!: string;

	public quizAnswers!: QuizAnswerModel[];

	public userDetails!: UserDetailsModel;

	public userTaskDays!: UserTaskDaysModel[];

	public userTasks!: TaskModel[];

	static get relationMappings(): RelationMappings {
		return {
			onboardingAnswers: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						from: `${DatabaseTableName.ONBOARDING_ANSWERS_TO_USERS}.userId`,
						to: `${DatabaseTableName.ONBOARDING_ANSWERS_TO_USERS}.answerId`,
					},
					to: `${DatabaseTableName.ONBOARDING_ANSWERS}.id`,
				},
				modelClass: OnboardingAnswerModel,
				relation: Model.ManyToManyRelation,
			},
			quizAnswers: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						from: `${DatabaseTableName.QUIZ_ANSWERS_TO_USERS}.userId`,
						to: `${DatabaseTableName.QUIZ_ANSWERS_TO_USERS}.answerId`,
					},
					to: `${DatabaseTableName.QUIZ_ANSWERS}.id`,
				},
				modelClass: QuizAnswerModel,
				relation: Model.ManyToManyRelation,
			},
			scores: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						extra: ["score"],
						from: `${DatabaseTableName.QUIZ_SCORES}.userId`,
						to: `${DatabaseTableName.QUIZ_SCORES}.categoryId`,
					},
					to: `${DatabaseTableName.CATEGORIES}.id`,
				},
				modelClass: CategoryModel,
				relation: Model.ManyToManyRelation,
			},
			tasks: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.TASKS}.userId`,
				},
				modelClass: TaskModel,
				relation: Model.HasManyRelation,
			},
			userDetails: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.USER_DETAILS}.userId`,
				},
				modelClass: UserDetailsModel,
				relation: Model.HasOneRelation,
			},
			userTaskDays: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.USER_TASK_DAYS}.userId`,
				},
				modelClass: UserTaskDaysModel,
				relation: Model.HasManyRelation,
			},
			userTasks: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.TASKS}.userId`,
				},
				modelClass: TaskModel,
				relation: Model.HasManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
