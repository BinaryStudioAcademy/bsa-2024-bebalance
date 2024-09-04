type UserDto = {
	allowNotifications?: boolean;
	createdAt: string;
	email: string;
	id: number;
	name: string;
	updatedAt: string;
	userTaskDays?: number[];
};

export { type UserDto };
