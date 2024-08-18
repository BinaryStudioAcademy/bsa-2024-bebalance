import { JWTPayload, jwtVerify, JWTVerifyResult, SignJWT } from "jose";

type ConstructorProperties = {
	algorithm: string;
	expirationTime: string;
	secret: Uint8Array;
};

class BaseJWTManager {
	private algorithm: string;
	private expirationTime: string;
	private secret: Uint8Array;

	constructor({ algorithm, expirationTime, secret }: ConstructorProperties) {
		this.secret = secret;
		this.algorithm = algorithm;
		this.expirationTime = expirationTime;
	}

	public async createToken(payload: JWTPayload): Promise<string> {
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

export { BaseJWTManager };
