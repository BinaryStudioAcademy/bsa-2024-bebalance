import { config } from "~/libs/modules/config/config.js";

import { BaseMailer } from "./base-mailer.module.js";

const mailer = new BaseMailer({
	appPassword: config.ENV.MAILER.APP_PASSWORD,
	host: config.ENV.MAILER.HOST,
	port: config.ENV.MAILER.PORT,
	service: config.ENV.MAILER.SERVICE,
	user: config.ENV.MAILER.ADDRESS,
});

export { mailer };
