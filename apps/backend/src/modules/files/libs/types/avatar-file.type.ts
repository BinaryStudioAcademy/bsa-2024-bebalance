import { type ValueOf } from "~/libs/types/types.js";

import { type ImageMimetype } from "../../../../libs/plugins/file-plugin/libs/enums/enums.js";

type AvatarFile = {
	buffer: Buffer;
	contentType: ValueOf<typeof ImageMimetype>;
	key: string;
};

export { type AvatarFile };
