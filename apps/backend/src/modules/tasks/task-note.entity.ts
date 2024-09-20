import { type Entity } from "~/libs/types/types.js";

class TaskNoteEntity implements Entity {
	private content: string;

	private createdAt: string;

	private id: null | number;

	private taskId: number;

	private updatedAt: string;

	private constructor({
		content,
		createdAt,
		id,
		taskId,
		updatedAt,
	}: {
		content: string;
		createdAt: string;
		id: null | number;
		taskId: number;
		updatedAt: string;
	}) {
		this.content = content;
		this.createdAt = createdAt;
		this.id = id;
		this.taskId = taskId;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		content,
		createdAt,
		id,
		taskId,
		updatedAt,
	}: {
		content: string;
		createdAt: string;
		id: number;
		taskId: number;
		updatedAt: string;
	}): TaskNoteEntity {
		return new TaskNoteEntity({
			content,
			createdAt,
			id,
			taskId,
			updatedAt,
		});
	}

	public static initializeNew({
		content,
		taskId,
	}: {
		content: string;
		taskId: number;
	}): TaskNoteEntity {
		return new TaskNoteEntity({
			content,
			createdAt: "",
			id: null,
			taskId,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		content: string;
		createdAt: string;
		taskId: number;
		updatedAt: string;
	} {
		return {
			content: this.content,
			createdAt: this.createdAt,
			taskId: this.taskId,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		content: string;
		createdAt: string;
		id: number;
		taskId: number;
		updatedAt: string;
	} {
		return {
			content: this.content,
			createdAt: this.createdAt,
			id: this.id as number,
			taskId: this.taskId,
			updatedAt: this.updatedAt,
		};
	}
}

export { TaskNoteEntity };
