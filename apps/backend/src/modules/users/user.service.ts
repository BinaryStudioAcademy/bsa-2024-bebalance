import { type MultipartFile } from "@fastify/multipart";
import { v4 as uuidV4 } from "uuid";

import { ErrorMessage } from "~/libs/enums/enums.js";
import { type Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import {
	FileEntity,
	FileError,
	type FileService,
} from "~/modules/files/files.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { UserError } from "./libs/exceptions/exceptions.js";
import {
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

	public async update(
		id: number,
		payload: UserUpdateRequestDto,
	): Promise<null | UserDto> {
		const user = await this.userRepository.update(id, payload);

		return user ? user.toObject() : null;
	}

	public async updateAvatar(
		userId: number,
		avatarFile?: MultipartFile,
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
			contentType: avatarFile.mimetype,
			fileBuffer: await avatarFile.toBuffer(),
			fileName: uuidV4(),
		};

		const { avatarUrl } = user.toObject();
		let newFileEntity: FileEntity;

		if (avatarUrl) {
			const fileByUrl = await this.fileService.findByUrl(avatarUrl);

			if (!fileByUrl) {
				throw new FileError({
					message: ErrorMessage.FILE_DOES_NOT_EXIST,
				});
			}

			const newAvatar = await this.fileService.update({
				fileId: fileByUrl.toObject().id,
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

		return await this.userRepository.update(userId, {
			avatarUrl: newFileEntity.toObject().url,
		});
	}
}

export { UserService };
