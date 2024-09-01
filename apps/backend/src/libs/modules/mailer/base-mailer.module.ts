import { type Transporter } from "nodemailer";
import NodeMailer from "nodemailer";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { MailError } from "~/libs/exceptions/exceptions.js";
import { config } from "~/libs/modules/config/config.js";
import { HTTPCode } from "~/libs/modules/http/http.js";

class BaseMailer {
	private sender = config.ENV.MAILER.ADDRESS;
	private transporter: Transporter;

	constructor() {
		this.transporter = NodeMailer.createTransport({
			auth: {
				pass: config.ENV.MAILER.APP_PASSWORD,
				user: config.ENV.MAILER.ADDRESS,
			},
			host: config.ENV.MAILER.HOST,
			port: config.ENV.MAILER.PORT,
			secure: true,
			service: config.ENV.MAILER.SERVICE,
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
