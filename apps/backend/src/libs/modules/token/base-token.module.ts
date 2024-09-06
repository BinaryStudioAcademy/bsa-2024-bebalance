import {
	type JWTPayload,
	jwtVerify,
	type JWTVerifyResult,
	SignJWT,
} from "jose";

type Constructor = {
	algorithm: string;
	secret: Uint8Array;
};

class BaseToken<T extends JWTPayload> {
	private algorithm: string;
	private secret: Uint8Array;

	constructor({ algorithm, secret }: Constructor) {
		this.secret = secret;
		this.algorithm = algorithm;
	}

	public async createToken({
		expirationTime,
		payload,
	}: {
		expirationTime: string;
		payload: T;
	}): Promise<string> {
		return await new SignJWT(payload)
			.setProtectedHeader({ alg: this.algorithm })
			.setIssuedAt()
			.setExpirationTime(expirationTime)
			.sign(this.secret);
	}

	public async decode(token: string): Promise<JWTVerifyResult<T>> {
		return await jwtVerify<T>(token, this.secret);
	}
}

export { BaseToken };
