import bcrypt from "bcrypt";

import { type Encrypt } from "./types/types.js";

class BaseEncrypt implements Encrypt {
	public async compare(data: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(data, hash);
	}

	public async generateHash(data: string, salt: string): Promise<string> {
		return await bcrypt.hash(data, salt);
	}

	public async generateSalt(rounds: number): Promise<string> {
		return await bcrypt.genSalt(rounds);
	}
}

export { BaseEncrypt };
