import { BaseEncrypt } from "./base-encrypt.module.js";
import { SALT_ROUNDS } from "./libs/constants/constants.js";

const encrypt = new BaseEncrypt(SALT_ROUNDS);

export { encrypt };
export { type Encrypt } from "./types/types.js";
