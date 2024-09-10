import { type Service } from "~/libs/types/types.js";

import { type TaskEntity } from "./task.entity.js";
import { type TaskRepository } from "./task.repository.js";

class TaskService implements Service {
	private taskRepository: TaskRepository;

	public constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	create(): Promise<unknown> {
		return Promise.resolve();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	find(): Promise<unknown> {
		return Promise.resolve();
	}

	findAll(): Promise<{ items: unknown[] }> {
		return Promise.resolve({
			items: [],
		});
	}

	async findAllByUserId(userId: number): Promise<TaskEntity[]> {
		return await this.taskRepository.findAllByUserId(userId);
	}

	update(): Promise<unknown> {
		return Promise.resolve();
	}
}

export { TaskService };
