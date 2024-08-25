import { Model, RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { QuizAnswersModel } from "./quiz-answers.model.js";

class QuizQuestionsModel extends AbstractModel {
	public categoryId!: number;

	public label!: string;

	public quizAnswers!: QuizAnswersModel;

	static get relationMappings(): RelationMappings {
		return {
			quizQuestions: {
				join: {
					from: `${DatabaseTableName.QUIZ_QUESTIONS}.id`,
					to: `${DatabaseTableName.QUIZ_ANSWERS}.questionId`,
				},
				modelClass: QuizAnswersModel,
				relation: Model.HasManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.QUIZ_QUESTIONS;
	}
}

export { QuizQuestionsModel };
