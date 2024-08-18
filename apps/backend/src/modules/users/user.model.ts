import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserDetailsModel } from "./user-details.model.js";

class UserModel extends AbstractModel {
	static relationMappings = {
		userDetails: {
			join: {
				from: `${DatabaseTableName.USERS}.id`,
				to: `${DatabaseTableName.USER_DETAILS}.userId`,
			},
			modelClass: UserDetailsModel,
			relation: Model.HasOneRelation,
		},
	};

	public email!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	public userDetails!: UserDetailsModel;

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
