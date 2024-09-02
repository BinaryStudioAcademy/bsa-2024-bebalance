import { config } from "~/libs/modules/config/config.js";

import { BaseMailer } from "./base-mailer.module.js";

const mailer = new BaseMailer({
	...config.ENV.MAILER,
});

export { mailer };
