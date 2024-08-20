import { genSalt, hash } from "bcrypt";

import { Encrypt } from "./libs/types/types.js";

class BaseEncrypt implements Encrypt {
	private saltRounds: number;

	constructor(saltRounds: number) {
		this.saltRounds = saltRounds;
	}

	private async generateHash(password: string, salt: string): Promise<string> {
		return await hash(password, salt);
	}

	private async generateSalt(): Promise<string> {
		return await genSalt(this.saltRounds);
	}

	public async encrypt(
		password: string,
	): Promise<{ hash: string; salt: string }> {
		const salt = await this.generateSalt();
		const hash = await this.generateHash(password, salt);

		return { hash, salt };
	}
}

export { BaseEncrypt };
