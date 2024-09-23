import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class QuizUserAnswerModel extends AbstractModel {
	public answerId!: number;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.QUIZ_ANSWERS_TO_USERS;
	}
}

export { QuizUserAnswerModel };
