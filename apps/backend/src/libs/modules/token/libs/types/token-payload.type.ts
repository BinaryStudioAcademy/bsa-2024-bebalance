import { JWTPayload } from "jose";

interface TokenPayload extends JWTPayload {
	userId: number;
}

export { TokenPayload };
