import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { QuizQuestionModel } from "../quiz-questions/quiz-question.model.js";
import { UserModel } from "../users/users.js";
import { type QuizAnswerEntity } from "./quiz-answer.entity.js";
import { QuizUserAnswerModel } from "./quiz-user-answer.model.js";

class QuizAnswerModel extends AbstractModel {
	public label!: string;

	public questionId!: number;

	public userAnswers!: QuizAnswerEntity[];

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
						modelClass: QuizUserAnswerModel,
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
