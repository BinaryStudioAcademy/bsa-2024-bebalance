import "fastify";

import { type AvatarFile } from "~/libs/plugins/plugins.js";
import { type UserDto } from "~/libs/types/types.js";

declare module "fastify" {
	interface FastifyRequest {
		uploadedFile?: AvatarFile;
		user?: UserDto;
	}
}
