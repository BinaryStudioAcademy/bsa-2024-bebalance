import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";

import { CategoryModel } from "../categories/category.model.js";
import { UserModel } from "../users/users.js";
import { type TaskStatus } from "./libs/enums/enums.js";

class TaskModel extends AbstractModel {
	public category!: CategoryModel;

	public categoryId!: number;

	public description!: string;

	public dueDate!: string;

	public label!: string;

	public status!: ValueOf<typeof TaskStatus>;

	public userId!: number;

	static get relationMappings(): RelationMappings {
		return {
			category: {
				join: {
					from: `${DatabaseTableName.TASKS}.categoryId`,
					to: `${DatabaseTableName.CATEGORIES}.id`,
				},
				modelClass: CategoryModel,
				relation: Model.BelongsToOneRelation,
			},
			user: {
				join: {
					from: `${DatabaseTableName.TASKS}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.TASKS;
	}
}

export { TaskModel };
