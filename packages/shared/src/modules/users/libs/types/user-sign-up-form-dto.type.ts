import { UserSignUpRequestDto } from "./types.js";

type UserSignUpFormDto = { confirmPassword: string } & UserSignUpRequestDto;

export { UserSignUpFormDto };
