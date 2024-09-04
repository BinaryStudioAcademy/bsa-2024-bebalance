import { type MultipartFile } from "@fastify/multipart";
import "fastify";

declare module "fastify" {
	interface FastifyRequest {
		uploadedFile?: MultipartFile;
	}
}
