import { encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { UserController } from "./user.controller.js";
import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserDetailsModel } from "./user-details.model.js";

const userRepository = new UserRepository(UserModel, UserDetailsModel);
const userService = new UserService(userRepository, encrypt);
const userController = new UserController(logger, userService);

export { UserValidationMessage } from "./libs/enums/enums.js";
export {
	type EmailDto,
	type ResetPasswordDto,
	type ResetPasswordLinkDto,
	type UserDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";
export {
	userForgotPasswordValidationSchema,
	userResetPasswordValidationSchema,
	userSignInValidationSchema,
	userSignUpValidationSchema,
	userUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { UserModel } from "./user.model.js";
export { UserService } from "./user.service.js";
export { userController, userService };
