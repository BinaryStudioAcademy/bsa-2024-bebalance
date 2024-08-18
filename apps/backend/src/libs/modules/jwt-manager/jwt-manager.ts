import { config } from "../config/config.js";
import { BaseJWTManager } from "./base-jwt-manager.js";

const JWTManager = new BaseJWTManager({
	algorithm: "HS256",
	expirationTime: "24hr",
	secret: new TextEncoder().encode(config.ENV.JWT.SECRET),
});

export { JWTManager };
