import { ErrorMessage } from "~/libs/enums/enums.js";
import { type Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import {
	type File,
	FileEntity,
	FileError,
	type FileService,
} from "~/modules/files/files.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { UserError } from "./libs/exceptions/exceptions.js";
import {
	type NotificationAnswersPayloadDto,
	type UserDto,
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
	type UserUpdateRequestDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private encrypt: Encrypt;
	private fileService: FileService;
	private userRepository: UserRepository;

	public constructor(
		userRepository: UserRepository,
		encrypt: Encrypt,
		fileService: FileService,
	) {
		this.userRepository = userRepository;
		this.encrypt = encrypt;
		this.fileService = fileService;
	}

	public async changePassword(id: number, password: string): Promise<UserDto> {
		const { hash, salt } = await this.encrypt.encrypt(password);

		const updates = {
			passwordHash: hash,
			passwordSalt: salt,
		};

		const user = await this.userRepository.updatePassword(id, updates);

		return user.toObject();
	}

	public async create(payload: UserSignUpRequestDto): Promise<UserDto> {
		const { hash, salt } = await this.encrypt.encrypt(payload.password);

		const user = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				name: payload.name,
				passwordHash: hash,
				passwordSalt: salt,
			}),
		);

		return user.toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<null | UserDto> {
		const user = await this.userRepository.find(id);

		return user?.toObject() ?? null;
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async findByEmail(email: string): Promise<null | UserEntity> {
		return await this.userRepository.findByEmail(email);
	}

	public async saveNotificationAnswers(
		id: number,
		payload: NotificationAnswersPayloadDto,
	): Promise<null | UserDto> {
		await this.userRepository.updateUserTaskDays(id, payload.userTaskDays);

		const user = await this.userRepository.update(id, {
			notificationFrequency: payload.notificationFrequency,
		});

		return user?.toObject() ?? null;
	}

	public async update(
		id: number,
		payload: UserUpdateRequestDto,
	): Promise<null | UserDto> {
		const user = await this.userRepository.update(id, payload);

		return user?.toObject() ?? null;
	}

	public async updateAvatar(
		userId: number,
		avatarFile?: File,
	): Promise<null | UserDto> {
		if (!avatarFile) {
			throw new UserError({
				message: ErrorMessage.FILE_MISSING,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const user = await this.userRepository.find(userId);

		const { avatarFileId } = user?.toObject() as UserDto;
		let newAvatar: FileEntity;

		if (avatarFileId) {
			const existingAvatar = await this.fileService.find(avatarFileId);

			if (!existingAvatar) {
				throw new FileError({
					message: ErrorMessage.FILE_DOES_NOT_EXIST,
				});
			}

			const avatarEntity = await this.fileService.update({
				fileId: existingAvatar.toObject().id,
				...avatarFile,
			});

			const updatedAvatar = avatarEntity?.toObject();

			newAvatar = FileEntity.initialize({
				createdAt: updatedAvatar?.createdAt as string,
				id: updatedAvatar?.id as number,
				updatedAt: updatedAvatar?.updatedAt as string,
				url: updatedAvatar?.url as string,
			});
		} else {
			const avatarEntity = await this.fileService.upload(avatarFile);

			const uploadedAvatar = avatarEntity.toObject();

			newAvatar = FileEntity.initialize({
				createdAt: uploadedAvatar.createdAt,
				id: uploadedAvatar.id,
				updatedAt: uploadedAvatar.updatedAt,
				url: uploadedAvatar.url,
			});
		}

		const updatedUser = await this.userRepository.updateAvatar(
			userId,
			newAvatar.toObject().id,
		);

		if (!updatedUser) {
			return null;
		}

		return updatedUser.toObject();
	}
}

export { UserService };
