import { HTTPCode } from "../../modules/http/http.js";
import { ValueOf } from "../../types/types.js";
import { HTTPError } from "../http-error/http-error.exception.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status?: ValueOf<typeof HTTPCode>;
};

class ServerError extends HTTPError {
	public constructor({
		cause,
		message,
		status = HTTPCode.INTERNAL_SERVER_ERROR,
	}: Constructor) {
		super({ cause, message, status });
	}
}

export { ServerError };
