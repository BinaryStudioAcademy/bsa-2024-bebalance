import {
	type UserGetOneResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import { type UserService } from "~/modules/users/user.service.js";
import * as jose from "jose";
import { createSecretKey } from "crypto";
import { HTTPCode, HTTPError } from "shared";

class AuthService {
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
	}

	public signUp(
		userRequestDto: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		return this.userService.create(userRequestDto);
	}

	public async getAuthenticatedUser(
		authentication: string,
	): Promise<UserGetOneResponseDto> {
		try {
			if (!authentication) {
				throw new HTTPError({
					cause: "No authentication token provided",
					message: "Unauthorized",
					status: HTTPCode.UNATHORIZED,
				});
			}
			const [scheme, token] = authentication.split(" ");
			if (scheme !== "Bearer" || !token) {
				throw new HTTPError({
					cause: "Invalid authentication scheme",
					message: "Unauthorized",
					status: HTTPCode.UNATHORIZED,
				});
			}
			const secretKey = createSecretKey(
				process.env["JWT_SECRET_KEY"] as string,
				"utf-8",
			);
			let payload: jose.JWTPayload | { id: number };
			try {
				const verifiedToken = await jose.jwtVerify(token as string, secretKey);
				payload = verifiedToken.payload;
			} catch (error) {
				throw new HTTPError({
					cause: "Invalid or expired token",
					message: "Unauthorized",
					status: HTTPCode.UNATHORIZED,
				});
			}
			const user = await this.userService.find(payload["id"] as number);
			if (!user) {
				throw new HTTPError({
					cause: "Invalid credentials",
					message: "Unauthorized",
					status: HTTPCode.UNATHORIZED,
				});
			}
			return user;
		} catch (error: unknown) {
			if (error instanceof HTTPError) {
				throw error;
			} else if (error instanceof Error) {
				throw new HTTPError({
					cause: error.message,
					message: "Internal Server Error",
					status: HTTPCode.INTERNAL_SERVER_ERROR,
				});
			} else {
				throw new HTTPError({
					cause: "Unknown error occurred",
					message: "Internal Server Error",
					status: HTTPCode.INTERNAL_SERVER_ERROR,
				});
			}
		}
	}
}

export { AuthService };
