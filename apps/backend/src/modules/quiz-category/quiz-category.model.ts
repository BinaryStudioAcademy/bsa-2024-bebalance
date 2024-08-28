import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class QuizCategoryModel extends AbstractModel {
	public name!: string;

	public static override get tableName(): string {
		return DatabaseTableName.CATEGORIES;
	}
}

export { QuizCategoryModel };
