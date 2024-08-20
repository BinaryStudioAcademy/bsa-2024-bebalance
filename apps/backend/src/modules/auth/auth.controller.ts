import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { tokenVerificationMiddleware } from "~/libs/modules/middleware/middleware.js";
import {
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
						userPayload: { id: number };
					}>,
				),
			method: "GET",
			path: AuthApiPath.AUTHENTICATED_USER,
			preHandler: tokenVerificationMiddleware,
		});
	}

	/**
	 * @swagger
	 * /auth/authenticated-user:
	 *   get:
	 *     description: Return authenticated user object
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
	private async getAuthenticatedUser(
		options: APIHandlerOptions<{
			userPayload: { id: number };
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.authService.getAuthenticatedUser(
				options.userPayload?.id as number,
			),
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
	 *                  message:
	 *                    type: object
	 *                    $ref: "#/components/schemas/User"
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
