import { type Transporter } from "nodemailer";

import { config } from "~/libs/modules/config/config.js";

class BaseMailer {
	private sender = config.ENV.MAILER.ADDRESS;
	private transporter: Transporter;

	constructor(transporter: Transporter) {
		this.transporter = transporter;
	}

	public sendResetPasswordEmail({
		recipient,
		resetLink,
	}: {
		recipient: string;
		resetLink: string;
	}): void {
		this.transporter.sendMail(
			{
				from: this.sender,
				subject: "BeBalance: password reset",
				text: `Follow this link to reset your password: ${resetLink}`,
				to: recipient,
			},
			(error) => {
				if (error) {
					throw new Error(error.message);
				} else {
					return;
				}
			},
		);
	}
}

export { BaseMailer };
