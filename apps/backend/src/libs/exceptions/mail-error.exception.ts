import { type HTTPCode } from "~/libs/modules/http/http.js";
import { HTTPError } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class MailError extends HTTPError {
	public constructor({ cause, message, status }: Constructor) {
		super({ cause, message, status });
	}
}

export { MailError };
