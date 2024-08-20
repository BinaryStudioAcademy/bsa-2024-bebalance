import bcrypt from "bcrypt";

import { type Encrypt } from "./types/types.js";

class BaseEncrypt implements Encrypt {
	private readonly saltRounds: number;

	constructor(saltRounds: number) {
		this.saltRounds = saltRounds;
	}

	private async generateHash(password: string, salt: string): Promise<string> {
		return await bcrypt.hash(password, salt);
	}

	private async generateSalt(): Promise<string> {
		return await bcrypt.genSalt(this.saltRounds);
	}

	public async compare(
		password: string,
		passwordHash: string,
		salt: string,
	): Promise<boolean> {
		const hash = await this.generateHash(password, salt);
		return hash === passwordHash;
	}

	public async encrypt(password: string): ReturnType<Encrypt["encrypt"]> {
		const salt = await this.generateSalt();
		const hash = await this.generateHash(password, salt);

		return { hash, salt };
	}
}

export { BaseEncrypt };
