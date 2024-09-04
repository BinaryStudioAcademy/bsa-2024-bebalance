import { type UserUpdateRequestDto } from "./user-update-request-dto.type.js";

type UserUpdateFormDto = { email: string } & UserUpdateRequestDto;

export { type UserUpdateFormDto };
