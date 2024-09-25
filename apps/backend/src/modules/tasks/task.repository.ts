import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { STATUS_FIELD } from "./libs/constants/constants.js";
import { SortOrder, TaskStatus } from "./libs/enums/enums.js";
import { TaskEntity } from "./task.entity.js";
import { TaskModel } from "./task.model.js";
import { TaskNoteEntity } from "./task-note.entity.js";
import { type TaskNoteModel } from "./task-note.model.js";

class TaskRepository implements Repository {
	private taskModel: typeof TaskModel;
	private taskNoteModel: typeof TaskNoteModel;

	public constructor(
		taskModel: typeof TaskModel,
		taskNoteModel: typeof TaskNoteModel,
	) {
		this.taskModel = taskModel;
		this.taskNoteModel = taskNoteModel;
	}

	public async addNote(payload: {
		content: string;
		taskId: number;
	}): Promise<TaskNoteEntity> {
		const note = await this.taskNoteModel
			.query()
			.insert(payload)
			.returning("*");

		return TaskNoteEntity.initialize({
			content: note.content,
			createdAt: note.createdAt,
			id: note.id,
			taskId: note.taskId,
			updatedAt: note.updatedAt,
		});
	}

	public async create(entity: TaskEntity): Promise<TaskEntity> {
		const { categoryId, description, dueDate, label, status, userId } =
			entity.toNewObject();

		const task = await this.taskModel
			.query()
			.insert({
				categoryId,
				description,
				dueDate,
				label,
				status,
				userId,
			})
			.returning("*")
			.withGraphFetched(`[${RelationName.CATEGORY}]`);

		return TaskEntity.initialize({
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
		});
	}

	public async delete(id: number): Promise<boolean> {
		const rowsDeleted = await this.taskModel.query().deleteById(id);

		return Boolean(rowsDeleted);
	}

	public async find(id: number): Promise<null | TaskEntity> {
		const task = await this.taskModel
			.query()
			.withGraphFetched(`[${RelationName.CATEGORY}]`)
			.findById(id);

		return task
			? TaskEntity.initialize({
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
				})
			: null;
	}

	public async findAll(): Promise<TaskEntity[]> {
		const tasks = await this.taskModel
			.query()
			.withGraphFetched(`[${RelationName.CATEGORY}]`);

		return tasks.map((task) => {
			return TaskEntity.initialize({
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
			});
		});
	}

	async findAllByUserId(userId: number): Promise<TaskEntity[]> {
		const tasks = await TaskModel.query().where({ userId });

		return tasks.map((task) => {
			return TaskEntity.initialize({
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
			});
		});
	}

	public async findCurrentByUserId(userId: number): Promise<TaskEntity[]> {
		const tasks = await this.taskModel
			.query()
			.withGraphFetched(`[${RelationName.CATEGORY}]`)
			.where({ status: TaskStatus.CURRENT, userId });

		return tasks.map((task) => {
			return TaskEntity.initialize({
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
			});
		});
	}

	public async findPastByUserId(userId: number): Promise<TaskEntity[]> {
		const tasks = await this.taskModel
			.query()
			.withGraphFetched(`[${RelationName.CATEGORY}]`)
			.whereIn(STATUS_FIELD, [TaskStatus.COMPLETED, TaskStatus.SKIPPED])
			.andWhere({ userId });

		return tasks.map((task) => {
			return TaskEntity.initialize({
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
			});
		});
	}

	public async getNotesByTaskId(taskId: number): Promise<TaskNoteEntity[]> {
		const notes = await this.taskNoteModel
			.query()
			.where({ taskId })
			.orderBy("createdAt", SortOrder.ASC);

		return notes.map((note) => {
			return TaskNoteEntity.initialize({
				content: note.content,
				createdAt: note.createdAt,
				id: note.id,
				taskId: note.taskId,
				updatedAt: note.updatedAt,
			});
		});
	}

	public async update(
		id: number,
		payload: Partial<TaskModel>,
	): Promise<TaskEntity> {
		const task = await this.taskModel
			.query()
			.patchAndFetchById(id, payload)
			.withGraphFetched(`[${RelationName.CATEGORY}]`);

		return TaskEntity.initialize({
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
		});
	}
}

export { TaskRepository };
