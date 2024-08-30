import NodeMailer from "nodemailer";

import { config } from "~/libs/modules/config/config.js";

import { BaseMailer } from "./base-mailer.module.js";

const transporter = NodeMailer.createTransport({
	auth: {
		pass: config.ENV.MAILER.APP_PASSWORD,
		user: config.ENV.MAILER.ADDRESS,
	},
	host: config.ENV.MAILER.HOST,
	port: config.ENV.MAILER.PORT,
	secure: true,
	service: config.ENV.MAILER.SERVICE,
});

const mailer = new BaseMailer(transporter);

export { mailer };
