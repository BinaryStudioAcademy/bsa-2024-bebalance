import { type Transporter } from "nodemailer";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { MailError } from "~/libs/exceptions/exceptions.js";
import { config } from "~/libs/modules/config/config.js";
import { HTTPCode } from "~/libs/modules/http/http.js";

class BaseMailer {
	private resetEmailUrl: string;
	private sender = config.ENV.MAILER.ADDRESS;
	private transporter: Transporter;

	constructor(transporter: Transporter, resetEmailUrl: string) {
		this.transporter = transporter;
		this.resetEmailUrl = resetEmailUrl;
	}

	public sendResetPasswordEmail({
		recipient,
		token,
	}: {
		recipient: string;
		token: string;
	}): void {
		this.transporter.sendMail(
			{
				from: this.sender,
				subject: "BeBalance: password reset",
				text: `Follow this link to reset your password: ${this.resetEmailUrl}/${token}`,
				to: recipient,
			},
			(error) => {
				if (error) {
					throw new MailError({
						cause: error.cause,
						message: ErrorMessage.MAIL_ERROR,
						status: HTTPCode.INTERNAL_SERVER_ERROR,
					});
				} else {
					return;
				}
			},
		);
	}
}

export { BaseMailer };
