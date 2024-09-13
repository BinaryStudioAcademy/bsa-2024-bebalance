import { type UserDto } from "~/modules/users/users.js";

type UsersTaskCreateRequestDto = {
	categoryId: number;
	description: string;
	label: string;
	user: UserDto;
};

export { type UsersTaskCreateRequestDto };
