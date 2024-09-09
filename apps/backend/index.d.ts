import "fastify";

import { type UserDto } from "~/libs/types/types.js";
import { type AvatarFile } from "~/modules/files/files.js";

declare module "fastify" {
	interface FastifyRequest {
		uploadedFile?: AvatarFile;
		user?: UserDto;
	}
}
