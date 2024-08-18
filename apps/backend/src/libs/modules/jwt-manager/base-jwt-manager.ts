import * as jose from "jose";

import { config } from "~/libs/modules/config/config.js";

class BaseJWTManager {
	private secret: Uint8Array;

	constructor() {
		this.secret = new TextEncoder().encode(config.ENV.JWT.JWT_SECRET);
	}

	async createToken(payload: jose.JWTPayload) {
		return await new jose.SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("24hr")
			.sign(this.secret);
	}
}

export { BaseJWTManager };
