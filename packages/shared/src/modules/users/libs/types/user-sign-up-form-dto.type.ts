import { type UserSignUpRequestDto } from "./types.js";

type UserSignUpFormDto = { confirmPassword: string } & UserSignUpRequestDto;

export { type UserSignUpFormDto };
