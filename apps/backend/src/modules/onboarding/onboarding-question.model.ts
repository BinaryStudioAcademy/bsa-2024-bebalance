import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { OnboardingAnswerModel } from "./onboarding-answer.model.js";

class OnboardingQuestionModel extends AbstractModel {
	public answers!: OnboardingAnswerModel[];

	public label!: string;

	static get relationMappings(): RelationMappings {
		return {
			answers: {
				join: {
					from: `${DatabaseTableName.ONBOARDING_QUESTIONS}.id`,
					to: `${DatabaseTableName.ONBOARDING_ANSWERS}.questionId`,
				},
				modelClass: OnboardingAnswerModel,
				relation: Model.HasManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.ONBOARDING_QUESTIONS;
	}
}

export { OnboardingQuestionModel };
