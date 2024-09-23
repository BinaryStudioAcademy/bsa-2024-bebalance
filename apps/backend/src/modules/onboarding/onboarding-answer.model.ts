import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/users.js";
import { OnboardingQuestionModel } from "./onboarding-question.model.js";
import { OnboardingUserAnswerModel } from "./onboarding-user-answer.model.js";

class OnboardingAnswerModel extends AbstractModel {
	public label!: string;

	public questionId!: number;

	public userId!: number;

	public users!: UserModel[];

	static get relationMappings(): RelationMappings {
		return {
			question: {
				join: {
					from: `${DatabaseTableName.ONBOARDING_ANSWERS}.questionId`,
					to: `${DatabaseTableName.ONBOARDING_QUESTIONS}.id`,
				},
				modelClass: OnboardingQuestionModel,
				relation: Model.BelongsToOneRelation,
			},
			users: {
				join: {
					from: `${DatabaseTableName.ONBOARDING_ANSWERS}.id`,
					through: {
						from: `${DatabaseTableName.ONBOARDING_ANSWERS_TO_USERS}.answerId`,
						modelClass: OnboardingUserAnswerModel,
						to: `${DatabaseTableName.ONBOARDING_ANSWERS_TO_USERS}.userId`,
					},
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.ManyToManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.ONBOARDING_ANSWERS;
	}
}

export { OnboardingAnswerModel };
