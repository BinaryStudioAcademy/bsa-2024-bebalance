import { type HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class MailError extends Error {
	public constructor({ cause, message }: Constructor) {
		super(message, {
			cause,
		});
	}
}

export { MailError };
