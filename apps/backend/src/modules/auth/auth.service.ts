import { ErrorMessage } from "~/libs/enums/enums.js";
import {
	AuthError,
	HTTPCode,
	HTTPError,
	ServerError,
} from "~/libs/modules/http/http.js";
import {
	type UserGetOneResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async getAuthenticatedUser(
		userId: number,
	): Promise<UserGetOneResponseDto> {
		try {
			const user = await this.userService.find(userId);
			if (!user) {
				throw new AuthError({
					cause: "Invalid credentials",
					message: ErrorMessage.UNAUTHORIZED,
				});
			}
			return user;
		} catch (error: unknown) {
			if (error instanceof HTTPError) {
				throw error;
			} else if (error instanceof Error) {
				throw new ServerError({
					cause: error.message,
					message: ErrorMessage.INTERNAL_SERVER_ERROR,
					status: HTTPCode.INTERNAL_SERVER_ERROR,
				});
			} else {
				throw new ServerError({
					cause: "Unknown error occurred",
					message: ErrorMessage.INTERNAL_SERVER_ERROR,
					status: HTTPCode.INTERNAL_SERVER_ERROR,
				});
			}
		}
	}

	public signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return this.userService.create(userRequestDto);
	}
}

export { AuthService };
