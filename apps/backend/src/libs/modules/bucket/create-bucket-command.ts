import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";

import { type ValueOf } from "~/libs/types/types.js";

import { config } from "../config/config.js";
import { BucketCommands } from "./libs/enums/enums.js";

type Options = {
	commandType: ValueOf<typeof BucketCommands>;
	params: Parameters;
};

type Parameters = {
	Body?: Buffer;
	ContentType?: string;
	Key: string;
};

type CommandParameters = { Bucket: string } & Parameters;

const createCommand = (
	options: Options,
): DeleteObjectCommand | GetObjectCommand | PutObjectCommand => {
	const commandParameters: CommandParameters = {
		...options.params,
		Bucket: config.ENV.S3_BUCKET.BUCKET_NAME,
	};

	switch (options.commandType) {
		case BucketCommands.GET: {
			return new GetObjectCommand(commandParameters);
		}

		case BucketCommands.PUT: {
			return new PutObjectCommand(commandParameters);
		}

		case BucketCommands.DELETE: {
			return new DeleteObjectCommand(commandParameters);
		}
	}
};

export { createCommand };
