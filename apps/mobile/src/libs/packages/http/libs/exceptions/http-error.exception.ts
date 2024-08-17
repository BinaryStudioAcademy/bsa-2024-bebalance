import { type ServerErrorType } from "~/libs/enums/enums";
import { type ServerErrorDetail, type ValueOf } from "~/libs/types/types";

import { type HTTPCode } from "../enums/enums";
import { HTTPError as LibraryHTTPError } from "./exceptions";

type Constructor = {
	cause?: unknown;
	details: ServerErrorDetail[];
	errorType: ValueOf<typeof ServerErrorType>;
	message: string;
	status: ValueOf<typeof HTTPCode>;
};

class HTTPError extends LibraryHTTPError {
	public details: ServerErrorDetail[];

	public errorType: ValueOf<typeof ServerErrorType>;

	public constructor({
		cause,
		details,
		errorType,
		message,
		status,
	}: Constructor) {
		super({
			cause,
			message,
			status,
		});

		this.errorType = errorType;
		this.details = details;
	}
}

export { HTTPError };
