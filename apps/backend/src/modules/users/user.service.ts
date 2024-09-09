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

	public async changePassword(
		id: number,
		password: string,
	): Promise<UserEntity> {
		const { hash, salt } = await this.encrypt.encrypt(password);

		const updates = {
			passwordHash: hash,
			passwordSalt: salt,
		};

		return await this.userRepository.updatePassword(id, updates);
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

	public async find(id: number): Promise<null | UserEntity> {
		return await this.userRepository.find(id);
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public findByEmail(email: string): Promise<null | UserEntity> {
		return this.userRepository.findByEmail(email);
	}

	public async saveNotificationAnswers(
		id: number,
		payload: NotificationAnswersPayloadDto,
	): Promise<null | UserEntity> {
		await this.userRepository.updateUserTaskDays(id, payload.userTaskDays);

		return await this.userRepository.update(id, {
			notificationFrequency: payload.notificationFrequency,
		});
	}

	public async update(
		id: number,
		payload: UserUpdateRequestDto,
	): Promise<null | UserDto> {
		const user = await this.userRepository.update(id, payload);

		return user ? user.toObject() : null;
	}

	public async updateAvatar(
		userId: number,
		avatarFile?: File,
	): Promise<null | UserEntity> {
		if (!avatarFile) {
			throw new UserError({
				message: ErrorMessage.FILE_MISSING,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const user = await this.userRepository.find(userId);

		if (!user) {
			throw new UserError({
				message: ErrorMessage.UNAUTHORIZED,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const file = {
			contentType: avatarFile.contentType,
			fileBuffer: avatarFile.buffer,
			fileName: avatarFile.key,
		};

		const { avatarFileId } = user.toObject();
		let newFileEntity: FileEntity;

		if (avatarFileId) {
			const userAvatar = await this.fileService.find(avatarFileId);

			if (!userAvatar) {
				throw new FileError({
					message: ErrorMessage.FILE_DOES_NOT_EXIST,
				});
			}

			const newAvatar = await this.fileService.update({
				fileId: userAvatar.toObject().id,
				...file,
			});

			newFileEntity = FileEntity.initializeNew({
				url: newAvatar?.toObject().url as string,
			});
		} else {
			const uploadedFile = await this.fileService.upload(file);

			newFileEntity = FileEntity.initializeNew({
				url: uploadedFile.toObject().url,
			});
		}

		return await this.userRepository.updateAvatar(userId, {
			url: newFileEntity.toObject().url,
		});
	}
}

export { UserService };
