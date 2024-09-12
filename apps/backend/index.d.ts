import "fastify";

import { type UserDto } from "~/libs/types/types.js";
import { type S3File } from "~/modules/files/files.js";

declare module "fastify" {
	interface FastifyRequest {
		uploadedFile?: S3File;
		user?: UserDto;
	}
}
