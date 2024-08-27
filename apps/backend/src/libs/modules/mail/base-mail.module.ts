import { type Transporter } from "nodemailer";

class BaseMail {
	private sender = "lysak.ihor4221@gmail.com";
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
				subject: "bebalance: password reset",
				text: `follow this link to reset your password: ${resetLink}`,
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

export { BaseMail };
