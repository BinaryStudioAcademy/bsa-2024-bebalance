import { ErrorMessage } from "~/libs/enums/enums.js";
import { type Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service, type ValueOf } from "~/libs/types/types.js";
import {
	type File,
	FileEntity,
	FileError,
	type FileService,
} from "~/modules/files/files.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { type NotificationFrequency } from "./libs/enums/enums.js";
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

		const user = await this.userRepository.updatePassword(id, updates);

		if (!user.avatarFileId) {
			return UserEntity.initialize({
				avatarFileId: null,
				avatarUrl: null,
				createdAt: user.createdAt,
				email: user.email,
				id: user.id,
				name: user.name,
				notificationFrequency: user.notificationFrequency as ValueOf<
					typeof NotificationFrequency
				>,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
				userTaskDays: user.userTaskDays,
			});
		}

		const avatarEntity = await this.fileService.find(user.avatarFileId);

		const avatar = avatarEntity?.toObject();

		return UserEntity.initialize({
			avatarFileId: avatar?.id ?? null,
			avatarUrl: avatar?.url ?? null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.name,
			notificationFrequency: user.notificationFrequency as ValueOf<
				typeof NotificationFrequency
			>,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays,
		});
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

		if (!user.avatarFileId) {
			return UserEntity.initialize({
				avatarFileId: null,
				avatarUrl: null,
				createdAt: user.createdAt,
				email: user.email,
				id: user.id,
				name: user.name,
				notificationFrequency: user.notificationFrequency as ValueOf<
					typeof NotificationFrequency
				>,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
				userTaskDays: user.userTaskDays,
			}).toObject();
		}

		const avatarEntity = await this.fileService.find(user.avatarFileId);

		const avatar = avatarEntity?.toObject();

		return UserEntity.initialize({
			avatarFileId: avatar?.id ?? null,
			avatarUrl: avatar?.url ?? null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.name,
			notificationFrequency: user.notificationFrequency as ValueOf<
				typeof NotificationFrequency
			>,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays,
		}).toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<null | UserEntity> {
		const user = await this.userRepository.find(id);

		if (!user) {
			throw new UserError({
				message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		if (!user.avatarFileId) {
			return UserEntity.initialize({
				avatarFileId: null,
				avatarUrl: null,
				createdAt: user.createdAt,
				email: user.email,
				id: user.id,
				name: user.name,
				notificationFrequency: user.notificationFrequency as ValueOf<
					typeof NotificationFrequency
				>,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
				userTaskDays: user.userTaskDays,
			});
		}

		const avatarEntity = await this.fileService.find(user.avatarFileId);

		const avatar = avatarEntity?.toObject();

		return UserEntity.initialize({
			avatarFileId: avatar?.id ?? null,
			avatarUrl: avatar?.url ?? null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.name,
			notificationFrequency: user.notificationFrequency as ValueOf<
				typeof NotificationFrequency
			>,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays,
		});
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: await Promise.all(
				items.map(async (item) => {
					if (!item.avatarFileId) {
						return UserEntity.initialize({
							avatarFileId: null,
							avatarUrl: null,
							createdAt: item.createdAt,
							email: item.email,
							id: item.id,
							name: item.name,
							notificationFrequency: item.notificationFrequency as ValueOf<
								typeof NotificationFrequency
							>,
							passwordHash: item.passwordHash,
							passwordSalt: item.passwordSalt,
							updatedAt: item.updatedAt,
							userTaskDays: item.userTaskDays,
						}).toObject();
					}

					const avatarEntity = await this.fileService.find(item.avatarFileId);

					const avatar = avatarEntity?.toObject();

					return UserEntity.initialize({
						avatarFileId: avatar?.id ?? null,
						avatarUrl: avatar?.url ?? null,
						createdAt: item.createdAt,
						email: item.email,
						id: item.id,
						name: item.name,
						notificationFrequency: item.notificationFrequency as ValueOf<
							typeof NotificationFrequency
						>,
						passwordHash: item.passwordHash,
						passwordSalt: item.passwordSalt,
						updatedAt: item.updatedAt,
						userTaskDays: item.userTaskDays,
					}).toObject();
				}),
			),
		};
	}

	public async findByEmail(email: string): Promise<null | UserEntity> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new UserError({
				message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		if (!user.avatarFileId) {
			return UserEntity.initialize({
				avatarFileId: null,
				avatarUrl: null,
				createdAt: user.createdAt,
				email: user.email,
				id: user.id,
				name: user.name,
				notificationFrequency: user.notificationFrequency as ValueOf<
					typeof NotificationFrequency
				>,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
				userTaskDays: user.userTaskDays,
			});
		}

		const avatarEntity = await this.fileService.find(user.avatarFileId);

		const avatar = avatarEntity?.toObject();

		return UserEntity.initialize({
			avatarFileId: avatar?.id ?? null,
			avatarUrl: avatar?.url ?? null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.name,
			notificationFrequency: user.notificationFrequency as ValueOf<
				typeof NotificationFrequency
			>,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays,
		});
	}

	public async saveNotificationAnswers(
		id: number,
		payload: NotificationAnswersPayloadDto,
	): Promise<null | UserDto> {
		await this.userRepository.updateUserTaskDays(id, payload.userTaskDays);

		const user = await this.userRepository.update(id, {
			notificationFrequency: payload.notificationFrequency,
		});

		if (!user) {
			throw new UserError({
				message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		if (!user.avatarFileId) {
			return UserEntity.initialize({
				avatarFileId: null,
				avatarUrl: null,
				createdAt: user.createdAt,
				email: user.email,
				id: user.id,
				name: user.name,
				notificationFrequency: user.notificationFrequency as ValueOf<
					typeof NotificationFrequency
				>,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
				userTaskDays: user.userTaskDays,
			}).toObject();
		}

		const avatarEntity = await this.fileService.find(user.avatarFileId);

		const avatar = avatarEntity?.toObject();

		return UserEntity.initialize({
			avatarFileId: avatar?.id ?? null,
			avatarUrl: avatar?.url ?? null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.name,
			notificationFrequency: user.notificationFrequency as ValueOf<
				typeof NotificationFrequency
			>,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays,
		}).toObject();
	}

	public async update(
		id: number,
		payload: UserUpdateRequestDto,
	): Promise<null | UserDto> {
		const user = await this.userRepository.update(id, payload);

		if (!user) {
			return null;
		}

		if (!user.avatarFileId) {
			return UserEntity.initialize({
				avatarFileId: null,
				avatarUrl: null,
				createdAt: user.createdAt,
				email: user.email,
				id: user.id,
				name: user.name,
				notificationFrequency: user.notificationFrequency as ValueOf<
					typeof NotificationFrequency
				>,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
				userTaskDays: user.userTaskDays,
			}).toObject();
		}

		const avatarEntity = await this.fileService.find(user.avatarFileId);

		const avatar = avatarEntity?.toObject();

		return UserEntity.initialize({
			avatarFileId: avatar?.id ?? null,
			avatarUrl: avatar?.url ?? null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.name,
			notificationFrequency: user.notificationFrequency as ValueOf<
				typeof NotificationFrequency
			>,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays,
		}).toObject();
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

		if (!user) {
			throw new UserError({
				message: ErrorMessage.UNAUTHORIZED,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		let newAvatar: FileEntity;

		if (user.avatarFileId) {
			const existingAvatar = await this.fileService.find(user.avatarFileId);

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

		const avatarEntity = await this.fileService.find(
			user.avatarFileId as number,
		);

		const avatar = avatarEntity?.toObject();

		return UserEntity.initialize({
			avatarFileId: avatar?.id ?? null,
			avatarUrl: avatar?.url ?? null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.name,
			notificationFrequency: user.notificationFrequency as ValueOf<
				typeof NotificationFrequency
			>,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays,
		}).toObject();
	}
}

export { UserService };
