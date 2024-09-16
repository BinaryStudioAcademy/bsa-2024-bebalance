import { ErrorMessage } from "~/libs/enums/enums.js";
import { type APIPreHandler } from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { UserError } from "~/modules/users/libs/exceptions/exceptions.js";
import {
	type UserDto,
	type UserUpdateParametersDto,
} from "~/modules/users/libs/types/types.js";

const checkAccessToUserData: APIPreHandler = (request, reply, done) => {
	const { params, user } = request;

	if ((user as UserDto).id !== +(params as UserUpdateParametersDto).id) {
		throw new UserError({
			message: ErrorMessage.FORBIDDEN,
			status: HTTPCode.FORBIDDEN,
		});
	}

	done();
};

export { checkAccessToUserData };
