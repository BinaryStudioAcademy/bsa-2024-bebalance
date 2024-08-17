import { genSalt, hash } from "bcrypt";

class Encryptor {
	private saltRounds: number;

	constructor(saltRounds: number) {
		this.saltRounds = saltRounds;
	}

	private generateHash(password: string, salt: string): Promise<string> {
		return hash(password, salt);
	}

	private generateSalt(): Promise<string> {
		return genSalt(this.saltRounds);
	}

	public async encrypt(
		password: string,
	): Promise<{ hash: string; salt: string }> {
		const salt = await this.generateSalt();
		const hash = await this.generateHash(password, salt);

		return { hash, salt };
	}
}

export { Encryptor };
