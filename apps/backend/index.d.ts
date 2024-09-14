import "fastify";

import { type UserDto } from "~/libs/types/types.js";
import { type UploadedFile } from "~/modules/files/files.js";

declare module "fastify" {
	interface FastifyRequest {
		uploadedFile?: UploadedFile;
		user?: UserDto;
	}
}
