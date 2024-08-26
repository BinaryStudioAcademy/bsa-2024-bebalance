import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { QuizQuestionsModel } from "./quiz-questions.model.js";

class QuizAnswersModel extends AbstractModel {
	public label!: string;

	public questionId!: number;

	public value!: number;

	static get relationMappings(): RelationMappings {
		return {
			question: {
				join: {
					from: `${DatabaseTableName.QUIZ_ANSWERS}.questionId`,
					to: `${DatabaseTableName.QUIZ_QUESTIONS}.id`,
				},
				modelClass: QuizQuestionsModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.QUIZ_ANSWERS;
	}
}

export { QuizAnswersModel };
