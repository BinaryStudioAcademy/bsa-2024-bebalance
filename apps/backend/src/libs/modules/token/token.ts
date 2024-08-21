import { config } from "~/libs/modules/config/config.js";
import { TokenPayload } from "~/libs/types/types.js";

import { BaseToken } from "./base-token.module.js";

const token = new BaseToken<TokenPayload>({
	algorithm: config.ENV.JWT.ALGORITHM,
	expirationTime: config.ENV.JWT.EXPIRATION_TIME,
	secret: Buffer.from(config.ENV.JWT.SECRET),
});

export { token };
