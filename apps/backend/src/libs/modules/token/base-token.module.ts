import { JWTPayload, jwtVerify, JWTVerifyResult, SignJWT } from "jose";

type Constructor = {
	algorithm: string;
	expirationTime: string;
	secret: Uint8Array;
};

class BaseToken<T extends JWTPayload> {
	private algorithm: string;
	private expirationTime: string;
	private secret: Uint8Array;

	constructor({ algorithm, expirationTime, secret }: Constructor) {
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
		return await jwtVerify<T>(token, this.secret);
	}
}

export { BaseToken };
