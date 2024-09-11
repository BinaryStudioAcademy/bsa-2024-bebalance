import { config } from "~/libs/modules/config/config.js";
import { type TokenPayload } from "~/libs/types/types.js";

import { BaseToken } from "./base-token.module.js";

const token = new BaseToken<TokenPayload>({
	algorithm: config.ENV.JWT.ALGORITHM,
	secret: Buffer.from(config.ENV.JWT.SECRET),
});

export { BaseToken } from "./base-token.module.js";
export { token };
