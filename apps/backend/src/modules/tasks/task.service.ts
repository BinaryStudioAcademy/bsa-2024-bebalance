import { type Service } from "~/libs/types/types.js";

import { type TaskDto } from "./libs/types/types.js";
import { type TaskRepository } from "./task.repository.js";

class TaskService implements Service {
	private taskRepository: TaskRepository;

	public constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	public create(): Promise<unknown> {
		return Promise.resolve();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): Promise<unknown> {
		return Promise.resolve();
	}

	public findAll(): Promise<{ items: unknown[] }> {
		return Promise.resolve({
			items: [],
		});
	}

	public async findCurrentByUserId(userId: number): Promise<TaskDto[]> {
		const tasks = await this.taskRepository.findCurrentByUserId(userId);

		return tasks.map((task) => task.toObject());
	}

	public update(): Promise<unknown> {
		return Promise.resolve();
	}
}

export { TaskService };
