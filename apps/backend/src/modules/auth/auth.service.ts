import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserSignInResponseDto> {
		const { email, password } = userRequestDto;
		const user = await this.userService.find({ email });

		if (!user) {
			throw new HTTPError({
				message: "User not found",
				status: HTTPCode.NOT_FOUND,
			});
		}

		if (user.toNewObject().passwordHash !== password) {
			throw new HTTPError({
				message: "Wrong password",
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		return user.toObject();
	}

	public signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return this.userService.create(userRequestDto);
	}
}

export { AuthService };
