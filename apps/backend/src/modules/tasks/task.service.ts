import { type Service } from "~/libs/types/types.js";

import { type TaskDto, type UsersTaskCreateDto } from "./libs/types/types.js";
import { TaskEntity } from "./task.entity.js";
import { type TaskModel } from "./task.model.js";
import { type TaskRepository } from "./task.repository.js";

class TaskService implements Service {
	private taskRepository: TaskRepository;

	public constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	public async create(payload: UsersTaskCreateDto): Promise<TaskDto> {
		const task = await this.taskRepository.create(
			TaskEntity.initializeNew({
				categoryId: payload.categoryId,
				description: payload.description,
				dueDate: payload.dueDate,
				label: payload.label,
				userId: payload.userId,
			}),
		);

		return task.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.taskRepository.delete(id);
	}

	public async find(id: number): Promise<null | TaskDto> {
		const task = await this.taskRepository.find(id);

		return task ? task.toObject() : null;
	}

	public async findAll(): Promise<{ items: TaskDto[] }> {
		const tasks = await this.taskRepository.findAll();

		return { items: tasks.map((task) => task.toObject()) };
	}

	public async findCurrentByUserId(userId: number): Promise<TaskDto[]> {
		const tasks = await this.taskRepository.findCurrentByUserId(userId);

		return tasks.map((task) => task.toObject());
	}

	public async update(
		id: number,
		payload: Partial<TaskModel>,
	): Promise<TaskDto> {
		const task = await this.taskRepository.update(id, payload);

		return task.toObject();
	}
}

export { TaskService };
