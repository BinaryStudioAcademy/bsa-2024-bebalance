import { type ValueOf } from "~/libs/types/types.js";

import { type ImageMimetype } from "../enums/enums.js";

type AvatarFile = {
	buffer: Buffer;
	contentType: ValueOf<typeof ImageMimetype>;
	key: string;
};

export { type AvatarFile };
