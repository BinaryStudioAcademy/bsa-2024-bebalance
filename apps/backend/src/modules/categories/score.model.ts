import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class ScoreModel extends AbstractModel {
	public categoryId!: number;

	public score!: number;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.QUIZ_SCORES;
	}
}

export { ScoreModel };
