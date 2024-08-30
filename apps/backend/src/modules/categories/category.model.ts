import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/user.model.js";
import { type QuizScoreDto } from "./libs/types/types.js";

class CategoryModel extends AbstractModel {
	public name!: string;

	public scores!: QuizScoreDto[];

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
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.CATEGORIES;
	}
}

export { CategoryModel };
