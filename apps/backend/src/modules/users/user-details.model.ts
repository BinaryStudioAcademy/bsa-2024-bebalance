import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";
import { FileModel } from "~/modules/files/file.model.js";

import { type NotificationFrequency } from "./libs/enums/enums.js";
import { UserModel } from "./user.model.js";

class UserDetailsModel extends AbstractModel {
	public avatarFileId!: number;

	public name!: string;

	public notificationFrequency!: ValueOf<typeof NotificationFrequency>;

	public userId!: number;

	static get relationMappings(): RelationMappings {
		return {
			avatarFile: {
				join: {
					from: `${DatabaseTableName.USER_DETAILS}.avatarFileId`,
					to: `${DatabaseTableName.FILES}.id`,
				},
				modelClass: FileModel,
				relation: Model.BelongsToOneRelation,
			},
			user: {
				join: {
					from: `${DatabaseTableName.USER_DETAILS}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USER_DETAILS;
	}
}

export { UserDetailsModel };
