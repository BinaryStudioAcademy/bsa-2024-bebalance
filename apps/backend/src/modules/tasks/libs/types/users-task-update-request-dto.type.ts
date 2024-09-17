import { type UserDto } from "~/modules/users/users.js";

import { type TaskUpdateRequestDto } from "./types.js";

type UsersTaskUpdateRequestDto = { user: UserDto } & TaskUpdateRequestDto;

export { type UsersTaskUpdateRequestDto };
