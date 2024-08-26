import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { QuizAnswerModel } from "../quiz-answers/quiz-answer.model.js";
import { UserDetailsModel } from "./user-details.model.js";

class UserModel extends AbstractModel {
	public email!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	public userDetails!: UserDetailsModel;

	static get relationMappings(): RelationMappings {
		return {
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
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
