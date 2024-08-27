import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { OnboardingQuestionModel } from "./onboarding-question.model.js";

class OnboardingAnswerModel extends AbstractModel {
	public label!: string;

	public questionId!: number;

	static get relationMappings(): RelationMappings {
		return {
			question: {
				join: {
					from: `${DatabaseTableName.ONBOARDING_ANSWERS}.question_id`,
					to: `${DatabaseTableName.ONBOARDING_QUESTIONS}.id`,
				},
				modelClass: OnboardingQuestionModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.ONBOARDING_ANSWERS;
	}
}

export { OnboardingAnswerModel };
