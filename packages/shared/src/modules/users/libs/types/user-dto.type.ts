type UserDto = {
	createdAt: string;
	email: string;
	id: number;
	name: string;
	notificationFrequency?: string;
	updatedAt: string;
	userTaskDays?: number[];
};

export { type UserDto };
