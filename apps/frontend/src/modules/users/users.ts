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
	type UserDto,
	type UserGetAllResponseDto,
	type UserGetParametersDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpFormDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
	type UserUpdatePayload,
	type UserUpdateRequestDto,
} from "./libs/types/types.js";
export {
	userSignInValidationSchema,
	userSignUpValidationSchema,
	userUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { actions, reducer } from "./slices/users.js";
