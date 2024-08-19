import { JWTPayload, jwtVerify, JWTVerifyResult, SignJWT } from "jose";

import { Algorithm, ExpirationTime } from "./libs/types/types.js";

type ConstructorProperties = {
	algorithm: Algorithm;
	expirationTime: ExpirationTime;
	secret: Uint8Array;
};

class BaseToken<T extends JWTPayload> {
	private algorithm: Algorithm;
	private expirationTime: ExpirationTime;
	private secret: Uint8Array;

	constructor({ algorithm, expirationTime, secret }: ConstructorProperties) {
		this.secret = secret;
		this.algorithm = algorithm;
		this.expirationTime = expirationTime;
	}

	public async createToken(payload: T): Promise<string> {
		return await new SignJWT(payload)
			.setProtectedHeader({ alg: this.algorithm })
			.setIssuedAt()
			.setExpirationTime(this.expirationTime)
			.sign(this.secret);
	}

	public async decode(token: string): Promise<JWTVerifyResult> {
		return await jwtVerify(token, this.secret);
	}
}

export { BaseToken };
