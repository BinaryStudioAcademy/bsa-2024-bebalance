import { JWTExpirationTime } from "../enums/enums.js";

type ExpirationTime =
	(typeof JWTExpirationTime)[keyof typeof JWTExpirationTime];

export { ExpirationTime };
