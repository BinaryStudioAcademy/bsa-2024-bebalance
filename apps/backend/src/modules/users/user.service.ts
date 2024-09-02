import { type MultipartFile } from "@fastify/multipart";
import { v4 as uuidV4 } from "uuid";

import { type Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { type Service } from "~/libs/types/types.js";
import { FileEntity, type FileService } from "~/modules/files/files.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserDto,
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
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

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}

	public async updateAvatar(
		userId: number,
		newAvatarFile: MultipartFile,
	): Promise<null | UserEntity> {
		const user = await this.userRepository.find(userId);

		if (!user) {
			throw new Error("User not found");
		}

		if (user.toObject().avatarUrl) {
			await this.fileService.deleteFile(user.toObject().avatarUrl);
		}

		const file = {
			contentType: newAvatarFile.mimetype,
			fileBuffer: await newAvatarFile.toBuffer(),
			fileName: uuidV4(),
		};

		const uploadedFile = await this.fileService.uploadFile(file);

		const newFileEntity = FileEntity.initializeNew({
			fileKey: uploadedFile.toObject().fileKey,
			url: uploadedFile.toObject().url,
		});

		return await this.userRepository.update(userId, {
			avatarUrl: newFileEntity.toObject().url,
		});
	}
}

export { UserService };
