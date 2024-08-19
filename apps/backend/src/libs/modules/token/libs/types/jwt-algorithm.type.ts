import { JWTAlgorithm } from "../enums/enums.js";

type Algorithm = (typeof JWTAlgorithm)[keyof typeof JWTAlgorithm];

export { Algorithm };
