import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";

import { config } from "../config/config.js";

type Options = {
	commandType: "delete" | "get" | "put";
	params: Parameters;
};

type Parameters = {
	Body?: Buffer;
	ContentType?: string;
	Key: string;
};

const createCommand = (
	options: Options,
): DeleteObjectCommand | GetObjectCommand | PutObjectCommand => {
	const commandParameters: { Bucket: string } & Parameters = {
		...options.params,
		Bucket: config.ENV.S3_BUCKET.BUCKET_NAME,
	};

	switch (options.commandType) {
		case "get": {
			return new GetObjectCommand(commandParameters);
		}

		case "put": {
			return new PutObjectCommand(commandParameters);
		}

		case "delete": {
			return new DeleteObjectCommand(commandParameters);
		}
	}
};

export { createCommand };
