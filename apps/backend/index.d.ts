import "fastify";

import { type UserDto } from "~/libs/types/types.js";
import { type File } from "~/modules/files/files.js";

declare module "fastify" {
	interface FastifyRequest {
		uploadedFile?: File;
		user?: UserDto;
	}
}
