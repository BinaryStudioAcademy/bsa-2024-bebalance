import { BaseEncrypt } from "./base-encrypt.module.js";
import { SALT_ROUNDS } from "./libs/constants.js";

const encrypt = new BaseEncrypt(SALT_ROUNDS);

export { encrypt };
