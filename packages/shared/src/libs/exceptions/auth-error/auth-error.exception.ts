import { type HTTPCode } from "../../../libs/modules/http/http.js";
import { type ValueOf } from "../../../libs/types/types.js";
import { HTTPError } from "../exceptions.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class AuthError extends HTTPError {
	public constructor({ cause, message, status }: Constructor) {
		super({
			cause,
			message,
			status,
		});
	}
}

export { AuthError };
