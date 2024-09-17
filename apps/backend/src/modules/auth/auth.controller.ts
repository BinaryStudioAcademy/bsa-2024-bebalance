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
	type ResetPasswordLinkDto,
	type UserDto,
	userForgotPasswordValidationSchema,
	userResetPasswordValidationSchema,
	type UserSignInRequestDto,
	userSignInValidationSchema,
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { type AuthService } from "./auth.service.js";
import { AuthApiPath } from "./libs/enums/enums.js";

/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: Endpoints related to authentication
 * components:
 *   schemas:
 *     ErrorTypeEnum:
 *       type: string
 *       enum: [COMMON, VALIDATION]
 *     CommonErrorResponse:
 *       type: object
 *       properties:
 *         errorType:
 *           $ref: "#/components/schemas/ErrorTypeEnum"
 *           example: COMMON
 *         message:
 *           type: string
 *           example: "Error message"
 *     ValidationErrorResponse:
 *       type: object
 *       properties:
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "This field is required"
 *               path:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: ["email"]
 *         errorType:
 *           $ref: "#/components/schemas/ErrorTypeEnum"
 *           example: VALIDATION
 *         message:
 *           type: string
 *           example: "Error message"
 */
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
				body: userForgotPasswordValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.resetPassword(
					options as APIHandlerOptions<{
						body: ResetPasswordDto;
					}>,
				),
			method: "PATCH",
			path: AuthApiPath.RESET_PASSWORD,
			validation: {
				body: userResetPasswordValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) =>
				this.checkIsResetPasswordExpired(
					options as APIHandlerOptions<{
						query: ResetPasswordLinkDto;
					}>,
				),
			method: "GET",
			path: AuthApiPath.CHECK_RESET_PASSWORD_EXPIRATION,
		});
	}

	/**
	 * @swagger
	 * /auth/check-reset-password-expiration:
	 *   get:
	 *     tags: [auth]
	 *     summary: Check if reset password link is expired
	 *     parameters:
	 *       - name: token
	 *         in: query
	 *         required: true
	 *         schema:
	 *           type: string
	 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
	 *     responses:
	 *       200:
	 *         description: Successfull operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: boolean
	 *               example: true
	 *       401:
	 *         description: Token expired
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 */
	private async checkIsResetPasswordExpired(
		options: APIHandlerOptions<{
			query: ResetPasswordLinkDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.checkIsResetPasswordExpired(
				options.query,
			),
			status: HTTPCode.OK,
		};
	}

	/**
	 * @swagger
	 * /auth/forgot-password:
	 *   post:
	 *     tags: [auth]
	 *     summary: Request reset password
	 *     description: Will send reset password link to given email
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               email:
	 *                 type: string
	 *                 format: email
	 *     responses:
	 *       200:
	 *         description: Successfull operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: boolean
	 *               example: true
	 *       401:
	 *         description: Email not found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 *       422:
	 *         description: Validation error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/ValidationErrorResponse"
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
	 *     tags: [auth]
	 *     summary: Get authenticated user
	 *     security:
	 *       - bearerAuth: []
	 *     responses:
	 *       200:
	 *         description: Successfull operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/UserDto"
	 *       401:
	 *         description: Unauthorized
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
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
	 *   patch:
	 *     tags: [auth]
	 *     summary: Reset user password
	 *     description: Will update user password with a new one
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               jwtToken:
	 *                 type: string
	 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
	 *               newPassword:
	 *                 type: string
	 *                 example: "123newPass"
	 *     responses:
	 *       200:
	 *         description: Successfull operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: boolean
	 *               example: true
	 *       401:
	 *         description: Invalid token
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 *       422:
	 *         description: Validation error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/ValidationErrorResponse"
	 */
	private async resetPassword(
		options: APIHandlerOptions<{
			body: ResetPasswordDto;
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
	 *   post:
	 *     tags: [auth]
	 *     summary: Authenticate with email and password
	 *     requestBody:
	 *       description: User credentials
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               email:
	 *                 type: string
	 *                 format: email
	 *               password:
	 *                 type: string
	 *                 example: s3cr3tpass
	 *     responses:
	 *       200:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 token:
	 *                   type: string
	 *                   description: "Authentication token for the user."
	 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
	 *                 user:
	 *                   $ref: "#/components/schemas/UserDto"
	 *       401:
	 *         description: Invalid credentials
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/CommonErrorResponse"
	 *       422:
	 *         description: Validation error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/ValidationErrorResponse"
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
	 *   post:
	 *     tags: [auth]
	 *     summary: Register as new user
	 *     requestBody:
	 *       description: New user data
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               email:
	 *                 type: string
	 *                 format: email
	 *               name:
	 *                 type: string
	 *                 example: username
	 *               password:
	 *                 type: string
	 *                 example: s3cr3tpass
	 *     responses:
	 *       201:
	 *         description: Successful operation
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 token:
	 *                   type: string
	 *                   description: "Authentication token for the user."
	 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
	 *                 user:
	 *                   $ref: "#/components/schemas/UserDto"
	 *       422:
	 *         description: Validation error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: "#/components/schemas/ValidationErrorResponse"
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
