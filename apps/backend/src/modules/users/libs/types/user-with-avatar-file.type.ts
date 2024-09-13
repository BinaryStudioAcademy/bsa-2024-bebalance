import { type UserDetailsWithAvatarFile } from "./user-details-with-avatar-file.type.js";
import { type UserTaskDay } from "./user-task-day.type.js";

type UserWithAvatarFile = {
	createdAt: string;
	email: string;
	id: number;
	passwordHash: string;
	passwordSalt: string;
	updatedAt: string;
	userDetails: UserDetailsWithAvatarFile;
	userTaskDays: UserTaskDay[];
};

export { type UserWithAvatarFile };
