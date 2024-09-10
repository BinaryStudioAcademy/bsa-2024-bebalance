import { encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { fileService } from "~/modules/files/files.js";

import { UserController } from "./user.controller.js";
import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserDetailsModel } from "./user-details.model.js";
import { UserTaskDaysModel } from "./user-task-days.model.js";

const userRepository = new UserRepository(
	UserDetailsModel,
	UserModel,
	UserTaskDaysModel,
);
const userService = new UserService(userRepository, encrypt, fileService);
const userController = new UserController(logger, userService);

export { UserValidationMessage } from "./libs/enums/enums.js";
export { UserError } from "./libs/exceptions/exceptions.js";
export {
	type EmailDto,
	type ResetPasswordDto,
	type UserDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";
export {
	notificationAnswersValidationSchema,
	userForgotPasswordVaidationSchema,
	userResetPasswordValidationSchema,
	userSignInValidationSchema,
	userSignUpValidationSchema,
	userUpdateValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
export { UserModel } from "./user.model.js";
export { UserService } from "./user.service.js";
export { userController, userService };
