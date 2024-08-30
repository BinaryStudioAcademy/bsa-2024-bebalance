import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { CategoryModel } from "../categories/category.model.js";
import { OnboardingAnswerModel } from "../onboarding/onboarding.js";
import { QuizAnswerModel } from "../quiz-answers/quiz-answer.model.js";
import { UserDetailsModel } from "./user-details.model.js";

class UserModel extends AbstractModel {
	public email!: string;

	public onboardingAnswers!: OnboardingAnswerModel[];

	public passwordHash!: string;

	public passwordSalt!: string;

	public quizAnswers!: QuizAnswerModel[];

	public userDetails!: UserDetailsModel;

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
						to: `${DatabaseTableName.QUIZ_ANSWERS_TO_USERS}.quizAnswerId`,
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
			userDetails: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.USER_DETAILS}.userId`,
				},
				modelClass: UserDetailsModel,
				relation: Model.HasOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
