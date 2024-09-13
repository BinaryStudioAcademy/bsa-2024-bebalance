import { HTTPCode } from "../../modules/http/http.js";
import { type ValueOf } from "../../types/types.js";
import { HTTPError } from "../http-error/http-error.exception.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status?: ValueOf<typeof HTTPCode>;
};

class FileError extends HTTPError {
	public constructor({
		cause,
		message,
		status = HTTPCode.BAD_REQUEST,
	}: Constructor) {
		super({ cause, message, status });
	}
}

export { FileError };
