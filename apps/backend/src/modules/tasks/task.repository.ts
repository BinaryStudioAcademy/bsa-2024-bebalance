import { type Repository } from "~/libs/types/types.js";
import { TaskEntity } from "~/modules/tasks/task.entity.js";

import { TaskModel } from "./task.model.js";

class TaskRepository implements Repository {
	private taskModel: typeof TaskModel;

	public constructor(taskModel: typeof TaskModel) {
		this.taskModel = taskModel;
	}

	async create(entity: TaskEntity): Promise<TaskEntity> {
		const { categoryId, description, dueDate, label, userId } =
			entity.toNewObject();
		const task = await this.taskModel
			.query()
			.insert({
				categoryId,
				description,
				dueDate,
				label,
				userId,
			})
			.returning("*");

		return TaskEntity.initialize({
			categoryId: task.categoryId,
			createdAt: task.createdAt,
			description: task.description,
			dueDate: task.dueDate,
			id: task.id,
			label: task.label,
			status: task.status,
			updatedAt: task.updatedAt,
			userId: task.userId,
		});
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

	async findAllByUserId(userId: number): Promise<TaskEntity[]> {
		const tasks = await TaskModel.query().where({ userId });

		return tasks.map((task) =>
			TaskEntity.initialize({
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
