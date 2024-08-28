import NodeMailer from "nodemailer";

import { config } from "~/libs/modules/config/config.js";

import { BaseMail } from "./base-mail.module.js";

const transporter = NodeMailer.createTransport({
	auth: {
		pass: config.ENV.MAILER.APP_PASSWORD,
		user: config.ENV.MAILER.ADDRESS,
	},
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	service: "Gmail",
});

const mail = new BaseMail(transporter);

export { mail };
