import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { CategoryModel } from "../categories/category.model.js";
import { QuizAnswerModel } from "../quiz-answers/quiz-answer.model.js";

class QuizQuestionModel extends AbstractModel {
	public answers!: QuizAnswerModel[];

	public categoryId!: number;

	public label!: string;

	static get relationMappings(): RelationMappings {
		return {
			answers: {
				join: {
					from: `${DatabaseTableName.QUIZ_QUESTIONS}.id`,
					to: `${DatabaseTableName.QUIZ_ANSWERS}.questionId`,
				},
				modelClass: QuizAnswerModel,
				relation: Model.HasManyRelation,
			},
			category: {
				join: {
					from: `${DatabaseTableName.QUIZ_QUESTIONS}.categoryId`,
					to: `${DatabaseTableName.CATEGORIES}.id`,
				},
				modelClass: CategoryModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.QUIZ_QUESTIONS;
	}
}

export { QuizQuestionModel };
