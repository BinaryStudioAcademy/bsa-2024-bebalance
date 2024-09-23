import { config } from "~/libs/packages/config/config";
import { http } from "~/libs/packages/http/http";
import { storage } from "~/libs/packages/storage/storage";

import { UserApi } from "./users-api";

const userApi = new UserApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { userApi };
export {
	NotificationFrequency,
	UserValidationMessage,
} from "./libs/enums/enums";
export {
	type EmailDto,
	type NotificationAnswersPayloadDto,
	type ResetPasswordDto,
	type ResetPasswordFormDto,
	type ResetPasswordLinkDto,
	type UserDto,
	type UserGetParametersDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpFormDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types";
export {
	notificationAnswersValidationSchema,
	userForgotPasswordValidationSchema,
	userResetPasswordValidationSchema,
	userSignInValidationSchema,
	userSignUpValidationSchema,
} from "./libs/validation-schemas/validation-schemas";
