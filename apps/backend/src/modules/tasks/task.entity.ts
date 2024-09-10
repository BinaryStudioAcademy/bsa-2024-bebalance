import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { TaskStatus } from "./libs/enums/enums.js";

class TaskEntity implements Entity {
	private categoryId: number;

	private createdAt: string;

	private description: string;

	private dueDate: string;

	private id: null | number;

	private label: string;

	private status: ValueOf<typeof TaskStatus>;

	private updatedAt: string;

	private userId: number;

	private constructor({
		categoryId,
		createdAt,
		description,
		dueDate,
		id,
		label,
		status,
		updatedAt,
		userId,
	}: {
		categoryId: number;
		createdAt: string;
		description: string;
		dueDate: string;
		id: null | number;
		label: string;
		status: ValueOf<typeof TaskStatus>;
		updatedAt: string;
		userId: number;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.categoryId = categoryId;
		this.label = label;
		this.description = description;
		this.dueDate = dueDate;
		this.status = status;
		this.userId = userId;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		categoryId,
		createdAt,
		description,
		dueDate,
		id,
		label,
		status,
		updatedAt,
		userId,
	}: {
		categoryId: number;
		createdAt: string;
		description: string;
		dueDate: string;
		id: null | number;
		label: string;
		status: ValueOf<typeof TaskStatus>;
		updatedAt: string;
		userId: number;
	}): TaskEntity {
		return new TaskEntity({
			categoryId,
			createdAt,
			description,
			dueDate,
			id,
			label,
			status,
			updatedAt,
			userId,
		});
	}

	public static initializeNew({
		categoryId,
		description,
		dueDate,
		label,
		userId,
	}: {
		categoryId: number;
		description: string;
		dueDate: string;
		label: string;
		userId: number;
	}): TaskEntity {
		return new TaskEntity({
			categoryId,
			createdAt: "",
			description,
			dueDate,
			id: null,
			label,
			status: TaskStatus.CURRENT,
			updatedAt: "",
			userId,
		});
	}

	public toNewObject(): {
		categoryId: number;
		createdAt: string;
		description: string;
		dueDate: string;
		label: string;
		status: ValueOf<typeof TaskStatus>;
		updatedAt: string;
		userId: number;
	} {
		return {
			categoryId: this.categoryId,
			createdAt: this.createdAt,
			description: this.description,
			dueDate: this.dueDate,
			label: this.label,
			status: this.status,
			updatedAt: this.updatedAt,
			userId: this.userId,
		};
	}

	public toObject(): {
		categoryId: number;
		createdAt: string;
		description: string;
		dueDate: string;
		id: number;
		label: string;
		status: ValueOf<typeof TaskStatus>;
		updatedAt: string;
		userId: number;
	} {
		return {
			categoryId: this.categoryId,
			createdAt: this.createdAt,
			description: this.description,
			dueDate: this.dueDate,
			id: this.id as number,
			label: this.label,
			status: this.status,
			updatedAt: this.updatedAt,
			userId: this.userId,
		};
	}
}

export { TaskEntity };
