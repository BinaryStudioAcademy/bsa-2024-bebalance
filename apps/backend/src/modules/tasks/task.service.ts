import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import {
	FULL_WEEK,
	NO_DAYS_THIS_WEEK,
	NO_USER_TASK_DAYS,
} from "./libs/constants/constants.js";
import { Sunday } from "./libs/enums/enums.js";
import { TaskError } from "./libs/exceptions/exceptions.js";
import {
	type TaskDto,
	type UsersTaskCreateRequestDto,
} from "./libs/types/types.js";
import { TaskEntity } from "./task.entity.js";
import { type TaskModel } from "./task.model.js";
import { type TaskRepository } from "./task.repository.js";

class TaskService implements Service {
	private calculateDeadline = (userTaskDays: number[]): string => {
		const createdAt = new Date();
		const createdAtDayOfWeek = createdAt.getDay();

		const normalizeTaskDays = userTaskDays.map((day) =>
			day === Sunday.USER_TASK ? Sunday.NORMALIZED : day,
		);
		const daysAfterCreatedAt = normalizeTaskDays.filter(
			(day) => day > createdAtDayOfWeek,
		);

		const nextDayOfTheWeek =
			daysAfterCreatedAt.length > NO_DAYS_THIS_WEEK
				? Math.min(...daysAfterCreatedAt)
				: Math.min(...normalizeTaskDays);

		const daysDifference = nextDayOfTheWeek - createdAtDayOfWeek;
		const daysIntervalUntilNextTask =
			daysDifference <= NO_DAYS_THIS_WEEK
				? daysDifference + FULL_WEEK
				: daysDifference;

		const deadline = new Date(createdAt);
		deadline.setDate(createdAt.getDate() + daysIntervalUntilNextTask);

		return deadline.toISOString();
	};

	private taskRepository: TaskRepository;

	public constructor(taskRepository: TaskRepository) {
		this.taskRepository = taskRepository;
	}

	public async create(payload: UsersTaskCreateRequestDto): Promise<TaskDto> {
		const { userTaskDays } = payload.user;

		if (!userTaskDays || userTaskDays.length === NO_USER_TASK_DAYS) {
			throw new TaskError({
				message: ErrorMessage.TASK_DAYS_NOT_DEFINED,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const deadline = this.calculateDeadline(userTaskDays);

		const task = await this.taskRepository.create(
			TaskEntity.initializeNew({
				categoryId: payload.categoryId,
				description: payload.description,
				dueDate: deadline,
				label: payload.label,
				userId: payload.user.id,
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
