import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";

import { BucketCommands } from "../enums/enums.js";
import { type Options } from "../types/types.js";

const createCommand = (
	options: Options,
): DeleteObjectCommand | GetObjectCommand | PutObjectCommand => {
	switch (options.commandType) {
		case BucketCommands.GET: {
			return new GetObjectCommand({ ...options.parameters });
		}

		case BucketCommands.PUT: {
			return new PutObjectCommand({ ...options.parameters });
		}

		case BucketCommands.DELETE: {
			return new DeleteObjectCommand({ ...options.parameters });
		}
	}
};

export { createCommand };
