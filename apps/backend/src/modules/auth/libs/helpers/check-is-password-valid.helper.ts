import { encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { type UserEntity } from "~/modules/users/user.entity.js";

const checkIsPasswordValid = async (
	currentPassword: string,
	user: UserEntity,
): Promise<boolean> => {
	const { passwordHash, passwordSalt } = user.toNewObject();

	return await encrypt.compare(currentPassword, passwordHash, passwordSalt);
};

export { checkIsPasswordValid };
