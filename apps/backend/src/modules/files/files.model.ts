import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { UserDetailsModel } from "~/modules/users/user-details.model.js";

class FileModel extends AbstractModel {
	public url!: string;

	static get relationMappings(): RelationMappings {
		return {
			userDetails: {
				join: {
					from: `${DatabaseTableName.FILES}.id`,
					to: `${DatabaseTableName.USER_DETAILS}.avatarFileId`,
				},
				modelClass: UserDetailsModel,
				relation: Model.HasOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.FILES;
	}
}

export { FileModel };
