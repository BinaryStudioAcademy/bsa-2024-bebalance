import { type ContentType } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type File = {
	buffer: Buffer;
	contentType: ValueOf<typeof ContentType>;
	key: string;
};

export { type File };
