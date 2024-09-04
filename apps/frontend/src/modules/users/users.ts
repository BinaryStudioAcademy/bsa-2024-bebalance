import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { UsersApi } from "./users-api.js";

const usersApi = new UsersApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { usersApi };
export {
	type EmailDto,
	type ResetPasswordDto,
	type ResetPasswordFormDto,
	type UserDto,
	type UserGetAllResponseDto,
	type UserPreferencesPayloadDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpFormDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";
export {
	userForgotPasswordVaidationSchema,
	userResetPasswordValidationSchema,
	userSignInValidationSchema,
	userSignUpValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/users.js";
