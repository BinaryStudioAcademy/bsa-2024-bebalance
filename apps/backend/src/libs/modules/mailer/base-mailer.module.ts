import { createTransport, type Transporter } from "nodemailer";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { MailError } from "~/libs/exceptions/exceptions.js";
import { config } from "~/libs/modules/config/config.js";
import { HTTPCode } from "~/libs/modules/http/http.js";

type Constructor = {
	address: string;
	appPassword: string;
	host: string;
	port: number;
	service: string;
};

class BaseMailer {
	private sender = config.ENV.MAILER.ADDRESS;
	private transporter: Transporter;

	constructor(settings: Constructor) {
		this.transporter = createTransport({
			auth: {
				pass: settings.appPassword,
				user: settings.address,
			},
			host: settings.host,
			port: settings.port,
			secure: true,
			service: settings.service,
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
