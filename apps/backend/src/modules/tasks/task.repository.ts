import { RelationName } from "~/libs/enums/relation-name.enum.js";
import { type Repository } from "~/libs/types/types.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";

import { TaskStatus } from "./libs/enums/enums.js";
import { type TaskModel } from "./task.model.js";

class TaskRepository implements Repository {
	private taskModel: typeof TaskModel;

	public constructor(taskModel: typeof TaskModel) {
		this.taskModel = taskModel;
	}

	create(): Promise<unknown> {
		return Promise.resolve();
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	find(): Promise<unknown> {
		return Promise.resolve();
	}

	findAll(): Promise<unknown[]> {
		return Promise.resolve([]);
	}

	async findCurrentByUserId(userId: number): Promise<TaskEntity[]> {
		const tasks = await this.taskModel
			.query()
			.withGraphFetched(`[${RelationName.CATEGORY}]`)
			.where({ status: TaskStatus.CURRENT, userId });

		return tasks.map((task) =>
			TaskEntity.initialize({
				category: task.category.name,
				categoryId: task.categoryId,
				createdAt: task.createdAt,
				description: task.description,
				dueDate: task.dueDate,
				id: task.id,
				label: task.label,
				status: task.status,
				updatedAt: task.updatedAt,
				userId: task.userId,
			}),
		);
	}

	update(): Promise<unknown> {
		return Promise.resolve();
	}
}

export { TaskRepository };
