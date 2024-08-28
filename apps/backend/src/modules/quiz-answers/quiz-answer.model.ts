import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/user.model.js";
import { QuizQuestionModel } from "./quiz-question.model.js";

class QuizAnswerModel extends AbstractModel {
	public label!: string;

	public questionId!: number;

	public users!: UserModel[];

	public value!: number;

	static get relationMappings(): RelationMappings {
		return {
			question: {
				join: {
					from: `${DatabaseTableName.QUIZ_ANSWERS}.questionId`,
					to: `${DatabaseTableName.QUIZ_QUESTIONS}.id`,
				},
				modelClass: QuizQuestionModel,
				relation: Model.BelongsToOneRelation,
			},
			users: {
				join: {
					from: `${DatabaseTableName.QUIZ_ANSWERS}.id`,
					through: {
						from: `${DatabaseTableName.QUIZ_ANSWERS_TO_USERS}.answerId`,
						to: `${DatabaseTableName.QUIZ_ANSWERS_TO_USERS}.userId`,
					},
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.ManyToManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.QUIZ_ANSWERS;
	}
}

export { QuizAnswerModel };
