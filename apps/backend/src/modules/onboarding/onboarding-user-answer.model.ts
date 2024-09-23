import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class OnboardingUserAnswerModel extends AbstractModel {
	public answerId!: number;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.ONBOARDING_ANSWERS_TO_USERS;
	}
}

export { OnboardingUserAnswerModel };
