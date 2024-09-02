import { type Transporter } from "nodemailer";
import NodeMailer from "nodemailer";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { MailError } from "~/libs/exceptions/exceptions.js";
import { config } from "~/libs/modules/config/config.js";
import { HTTPCode } from "~/libs/modules/http/http.js";

type Construtctor = {
	appPassword: string;
	host: string;
	port: number;
	service: string;
	user: string;
};

class BaseMailer {
	private sender = config.ENV.MAILER.ADDRESS;
	private transporter: Transporter;

	constructor(inputs: Construtctor) {
		this.transporter = NodeMailer.createTransport({
			auth: {
				pass: inputs.appPassword,
				user: inputs.user,
			},
			host: inputs.host,
			port: inputs.port,
			secure: true,
			service: inputs.service,
		});
	}

	public sendEmail({
		subject,
		text,
		to,
	}: {
		subject: string;
		text: string;
		to: string;
	}): void {
		this.transporter.sendMail(
			{
				from: this.sender,
				subject,
				text,
				to,
			},
			(error) => {
				throw new MailError({
					cause: (error as Error).cause,
					message: ErrorMessage.MAIL_ERROR,
					status: HTTPCode.INTERNAL_SERVER_ERROR,
				});
			},
		);
	}
}

export { BaseMailer };
