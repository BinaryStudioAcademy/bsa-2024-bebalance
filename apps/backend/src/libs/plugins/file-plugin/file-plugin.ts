import fastifyMultipart, { type MultipartFile } from "@fastify/multipart";
import fp from "fastify-plugin";

import { ContentType, ErrorMessage } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { FileError, type UploadedFile } from "~/modules/files/files.js";

import { ServerHooks } from "../libs/enums/enums.js";
import {
	ALLOWED_NUMBER_OF_FILES,
	FILE_SIZE_LIMIT_IN_BYTES,
} from "./libs/constants/constants.js";

const filePlugin = fp((app, _, done) => {
	app.register(fastifyMultipart);

	app.addHook(ServerHooks.PRE_HANDLER, async (request) => {
		try {
			if (!request.isMultipart()) {
				return;
			}

			const file = (await request.file({
				limits: {
					files: ALLOWED_NUMBER_OF_FILES,
					fileSize: FILE_SIZE_LIMIT_IN_BYTES,
				},
				throwFileSizeLimit: false,
			})) as MultipartFile;

			if (
				file.mimetype !== ContentType.JPEG &&
				file.mimetype !== ContentType.PNG
			) {
				throw new FileError({
					message: ErrorMessage.UNSUPPORTED_FILE_TYPE,
				});
			}

			const avatarFile: UploadedFile = {
				buffer: await file.toBuffer(),
				contentType: file.mimetype as ValueOf<typeof ContentType>,
				key: file.filename,
			};

			if (file.file.truncated) {
				throw new FileError({
					message: ErrorMessage.LARGE_FILE_SIZE,
				});
			}

			request.uploadedFile = avatarFile;
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
