import { config } from "../config/config.js";
import { BaseToken } from "./base-token.js";

const token = new BaseToken({
	algorithm: "HS256",
	expirationTime: "24hr",
	secret: new TextEncoder().encode(config.ENV.JWT.SECRET),
});

export { token };
