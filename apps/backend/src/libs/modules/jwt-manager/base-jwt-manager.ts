import { JWTPayload, jwtVerify, JWTVerifyResult, SignJWT } from "jose";

import { config } from "~/libs/modules/config/config.js";

class BaseJWTManager {
	private secret: Uint8Array;

	constructor() {
		this.secret = new TextEncoder().encode(config.ENV.JWT.SECRET);
	}

	public async createToken(payload: JWTPayload): Promise<string> {
		return await new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("24hr")
			.sign(this.secret);
	}

	public async decode(token: string): Promise<JWTVerifyResult> {
		return await jwtVerify(token, this.secret);
	}
}

export { BaseJWTManager };
