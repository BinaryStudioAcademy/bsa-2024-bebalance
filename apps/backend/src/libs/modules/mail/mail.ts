import NodeMailer from "nodemailer";

import { BaseMail } from "./base-mail.module.js";

const transporter = NodeMailer.createTransport({
	auth: {
		pass: "siph gtpe jgvu fvwv",
		user: "lysak.ihor4221@gmail.com",
	},
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	service: "Gmail",
});

const mail = new BaseMail(transporter);

export { mail };
