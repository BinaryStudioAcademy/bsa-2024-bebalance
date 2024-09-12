import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { TaskStatus } from "./libs/enums/enums.js";
import { TaskEntity } from "./task.entity.js";
import { type TaskModel } from "./task.model.js";

class TaskRepository implements Repository {
	private taskModel: typeof TaskModel;

	public constructor(taskModel: typeof TaskModel) {
		this.taskModel = taskModel;
	}

	public create(): Promise<unknown> {
		return Promise.resolve();
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): Promise<unknown> {
		return Promise.resolve();
	}

	public findAll(): Promise<unknown[]> {
		return Promise.resolve([]);
	}

	public async findCurrentByUserId(userId: number): Promise<TaskEntity[]> {
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

	public update(): Promise<unknown> {
		return Promise.resolve();
	}
}

export { TaskRepository };
