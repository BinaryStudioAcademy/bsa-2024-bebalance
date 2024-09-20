import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { TaskModel } from "../tasks/task.model.js";

class TaskNoteModel extends AbstractModel {
	public content!: string;

	public taskId!: number;

	static get relationMappings(): RelationMappings {
		return {
			task: {
				join: {
					from: `${DatabaseTableName.TASK_NOTES}.taskId`,
					to: `${DatabaseTableName.TASKS}.id`,
				},
				modelClass: TaskModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.TASK_NOTES;
	}
}

export { TaskNoteModel };
