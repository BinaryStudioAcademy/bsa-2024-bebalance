import { BaseMailer, transporter } from "./base-mailer.module.js";

const mailer = new BaseMailer(transporter);

export { mailer };
