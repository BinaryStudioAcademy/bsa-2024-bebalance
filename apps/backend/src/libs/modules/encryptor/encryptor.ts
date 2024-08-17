import { Encryptor } from "./encryptor.module.js";
import { SALT_ROUNDS } from "./libs/constants.js";

const encryptor = new Encryptor(SALT_ROUNDS);

export { encryptor };
