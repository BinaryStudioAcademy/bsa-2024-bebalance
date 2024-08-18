import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class UserDetailsModel extends AbstractModel {
	public name!: string;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.USER_DETAILS;
	}
}

export { UserDetailsModel };
