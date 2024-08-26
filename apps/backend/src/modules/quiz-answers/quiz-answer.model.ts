import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/users.js";

class QuizAnswerModel extends AbstractModel {
	public label!: string;

	public questionId!: number;

	public users!: UserModel[];

	public value!: number;

	static get relationMappings(): RelationMappings {
		return {
			users: {
				join: {
					from: `${DatabaseTableName.QUIZ_ANSWERS}.id`,
					through: {
						from: `${DatabaseTableName.QUIZ_ANSWERS_TO_USERS}.answerId`,
						to: `${DatabaseTableName.QUIZ_ANSWERS_TO_USERS}.userId`,
					},
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.ManyToManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.QUIZ_ANSWERS;
	}
}

export { QuizAnswerModel };
