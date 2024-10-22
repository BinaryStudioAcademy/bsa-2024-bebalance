import { type ContentType } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type UploadedFile = {
	buffer: Buffer;
	contentType: ValueOf<typeof ContentType>;
	key: string;
};

export { type UploadedFile };
