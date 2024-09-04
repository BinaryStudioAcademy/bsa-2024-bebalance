import fastifyMultipart, { type MultipartFile } from "@fastify/multipart";
import fp from "fastify-plugin";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { FileError } from "~/modules/files/files.js";

import { ServerHooks } from "../libs/enums/enums.js";

const filePlugin = fp((app, _, done) => {
	app.register(fastifyMultipart);

	app.addHook(ServerHooks.PRE_HANDLER, async (request) => {
		try {
			if (request.isMultipart()) {
				request.uploadedFile = (await request.file()) as MultipartFile;
			}
		} catch (error) {
			if (error instanceof FileError) {
				throw error;
			}

			throw new FileError({ message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND });
		}
	});

	done();
});

export { filePlugin };
