import { type UserDto } from "~/modules/users/users.js";

type UsersTaskCreateDto = {
	categoryId: number;
	description: string;
	label: string;
	user: UserDto;
};

export { type UsersTaskCreateDto };
