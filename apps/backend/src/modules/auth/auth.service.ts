import { JWTManager } from "~/libs/modules/jwt-manager/jwt-manager.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
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
		const { email } = userRequestDto;
		const user = await this.userService.find({ email });
		const token = await JWTManager.createToken({ userId: user.id });

		return { token, user };
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignInResponseDto> {
		const user = await this.userService.create(userRequestDto);
		const token = await JWTManager.createToken({ userId: user.id });

		return { token, user };
	}
}

export { AuthService };
