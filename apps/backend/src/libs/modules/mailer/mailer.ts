import { config } from "~/libs/modules/config/config.js";

import { BaseMailer } from "./base-mailer.module.js";

const { ADDRESS, APP_PASSWORD, HOST, PORT, SERVICE } = config.ENV.MAILER;

const mailer = new BaseMailer({
	address: ADDRESS,
	appPassword: APP_PASSWORD,
	host: HOST,
	port: PORT,
	service: SERVICE,
});

export { mailer };
