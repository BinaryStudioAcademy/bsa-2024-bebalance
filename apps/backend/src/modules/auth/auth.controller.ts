import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type EmailDto,
	type ResetPasswordDto,
	type UserDto,
	userForgotPasswordVaidationSchema,
	userResetPasswordValidationSchema,
	type UserSignInRequestDto,
	userSignInValidationSchema,
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { type AuthService } from "./auth.service.js";
import { AuthApiPath } from "./libs/enums/enums.js";

class AuthController extends BaseController {
	private authService: AuthService;

	public constructor(logger: Logger, authService: AuthService) {
		super(logger, APIPath.AUTH);

		this.authService = authService;

		this.addRoute({
			handler: (options) =>
				this.signUp(
					options as APIHandlerOptions<{
						body: UserSignUpRequestDto;
					}>,
				),
			method: "POST",
			path: AuthApiPath.SIGN_UP,
			validation: {
				body: userSignUpValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.getAuthenticatedUser(
					options as APIHandlerOptions<{
						user: UserDto;
					}>,
				),
			method: "GET",
			path: AuthApiPath.AUTHENTICATED_USER,
		});

		this.addRoute({
			handler: (options) =>
				this.signIn(
					options as APIHandlerOptions<{
						body: UserSignInRequestDto;
					}>,
				),
			method: "POST",
			path: AuthApiPath.SIGN_IN,
			validation: {
				body: userSignInValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.forgotPassword(
					options as APIHandlerOptions<{
						body: EmailDto;
					}>,
				),
			method: "POST",
			path: AuthApiPath.FORGOT_PASSWORD,
			validation: {
				body: userForgotPasswordVaidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.resetPassword(
					options as APIHandlerOptions<{
						body: Omit<ResetPasswordDto, "confirmPassword">;
					}>,
				),
			method: "PATCH",
			path: AuthApiPath.RESET_PASSWORD,
			validation: {
				body: userResetPasswordValidationSchema,
			},
		});
	}

	/**
	 * @swagger
	 * /auth/forgot-password:
	 *   post:
	 *     description: Return authenticated user
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Successfull operation
	 */

	private async forgotPassword(
		options: APIHandlerOptions<{
			body: EmailDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.forgotPassword(options.body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/authenticated-user:
	 *   get:
	 *     description: Return authenticated user
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Successfull operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               $ref: "#/components/schemas/User"
	 */
	private getAuthenticatedUser(
		options: APIHandlerOptions<{
			user: UserDto;
		}>,
	): APIHandlerResponse {
		return {
			payload: options.user,
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/reset-password:
	 *   post:
	 *     description: Return authenticated user
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Successfull operation
	 */

	private async resetPassword(
		options: APIHandlerOptions<{
			body: Omit<ResetPasswordDto, "confirmPassword">;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.resetPassword(options.body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/sign-in:
	 *    post:
	 *      description: Sign in user into the system
	 *      requestBody:
	 *        description: User auth data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                email:
	 *                  type: string
	 *                  format: email
	 *                password:
	 *                  type: string
	 *      responses:
	 *        200:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  user:
	 *                    $ref: "#/components/schemas/User"
	 *                  token:
	 *                    type: string
	 *                    description: "Authentication token for the user."
	 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
	 */
	private async signIn(
		options: APIHandlerOptions<{
			body: UserSignInRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.signIn(options.body),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/sign-up:
	 *    post:
	 *      description: Sign up user into the system
	 *      requestBody:
	 *        description: User auth data
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *              properties:
	 *                email:
	 *                  type: string
	 *                  format: email
	 *                name:
	 *                  type: string
	 *                password:
	 *                  type: string
	 *      responses:
	 *        201:
	 *          description: Successful operation
	 *          content:
	 *            application/json:
	 *              schema:
	 *                type: object
	 *                properties:
	 *                  user:
	 *                    $ref: "#/components/schemas/User"
	 *                  token:
	 *                    type: string
	 *                    description: "Authentication token for the user."
	 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
	 */

	private async signUp(
		options: APIHandlerOptions<{
			body: UserSignUpRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.signUp(options.body),
			status: HTTPCode.CREATED,
		};
	}
}

export { AuthController };
