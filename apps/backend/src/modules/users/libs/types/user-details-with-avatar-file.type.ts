import { type File } from "~/modules/files/files.js";

import { type UserDetailsModel } from "../../user-details.model.js";

type UserDetailsWithAvatarFile = {
	avatarFile?: File;
} & UserDetailsModel;

export { type UserDetailsWithAvatarFile };
