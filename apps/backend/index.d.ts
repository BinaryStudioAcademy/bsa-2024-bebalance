import { type MultipartFile } from "@fastify/multipart";
import "fastify";

import { type UserDto } from "~/libs/types/types.js";

declare module "fastify" {
	interface FastifyRequest {
		uploadedFile?: MultipartFile;
		user?: UserDto;
	}
}
