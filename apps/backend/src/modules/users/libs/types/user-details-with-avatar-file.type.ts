import { type UserDetailsModel } from "../../user-details.model.js";
import { type AvatarFile } from "./avatar-file.type.js";

type UserDetailsWithAvatarFile = {
	avatarFile?: AvatarFile;
} & UserDetailsModel;

export { type UserDetailsWithAvatarFile };
