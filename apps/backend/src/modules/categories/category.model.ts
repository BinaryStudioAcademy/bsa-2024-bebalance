import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { TaskModel } from "../tasks/tasks.js";
import { UserModel } from "../users/users.js";
import { type CategoryEntity } from "./category.entity.js";

class CategoryModel extends AbstractModel {
	public name!: string;

	public scores!: CategoryEntity[];

	static get relationMappings(): RelationMappings {
		return {
			scores: {
				join: {
					from: `${DatabaseTableName.CATEGORIES}.id`,
					through: {
						extra: ["score"],
						from: `${DatabaseTableName.QUIZ_SCORES}.categoryId`,
						to: `${DatabaseTableName.QUIZ_SCORES}.userId`,
					},
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.ManyToManyRelation,
			},
			tasks: {
				join: {
					from: `${DatabaseTableName.CATEGORIES}.id`,
					to: `${DatabaseTableName.TASKS}.categoryId`,
				},
				modelClass: TaskModel,
				relation: Model.HasManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.CATEGORIES;
	}
}

export { CategoryModel };
