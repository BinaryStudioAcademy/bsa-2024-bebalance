import { HTTPCode } from "../../modules/http/http.js";
import { type ValueOf } from "../../types/types.js";
import { HTTPError } from "../http-error/http-error.exception.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status?: ValueOf<typeof HTTPCode>;
};

class AuthError extends HTTPError {
	public constructor({
		cause,
		message,
		status = HTTPCode.UNAUTHORIZED,
	}: Constructor) {
		super({ cause, message, status });
	}
}

export { AuthError };
