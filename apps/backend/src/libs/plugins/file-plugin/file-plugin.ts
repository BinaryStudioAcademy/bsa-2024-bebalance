import fastifyMultipart, { type MultipartFile } from "@fastify/multipart";
import fp from "fastify-plugin";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { FileError } from "~/modules/files/files.js";

import { ServerHooks } from "../libs/enums/enums.js";
import { FILE_SIZE_LIMIT } from "./libs/constants/constants.js";
import { ImageMimetype } from "./libs/enums/enums.js";
import { type AvatarFile } from "./libs/types/types.js";

const filePlugin = fp((app, _, done) => {
	app.register(fastifyMultipart);

	app.addHook(ServerHooks.PRE_HANDLER, async (request) => {
		try {
			if (request.isMultipart()) {
				const file = (await request.file({
					limits: {
						files: 1,
						fileSize: FILE_SIZE_LIMIT,
					},
					throwFileSizeLimit: true,
				})) as MultipartFile;

				if (
					!Object.values(ImageMimetype).includes(
						file.mimetype as ValueOf<typeof ImageMimetype>,
					)
				) {
					throw new FileError({
						message: ErrorMessage.UNSUPPORTED_FILE_TYPE,
					});
				}

				const avatarFile: AvatarFile = {
					buffer: await file.toBuffer(),
					contentType: file.mimetype as ValueOf<typeof ImageMimetype>,
					key: file.filename,
				};

				request.uploadedFile = avatarFile;
			}
		} catch (error) {
			if ((error as Error).message.includes("file too large")) {
				throw new FileError({
					message: ErrorMessage.LARGE_FILE_SIZE,
				});
			}

			if (error instanceof FileError) {
				throw error;
			}

			throw new FileError({ message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND });
		}
	});

	done();
});

export { filePlugin };
