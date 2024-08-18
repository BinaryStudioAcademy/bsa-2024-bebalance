import { Encryptor } from "~/libs/modules/encryptor/encryptor.module.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserGetAllResponseDto,
	type UserGetOneResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private encryptor: Encryptor;
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository, encryptor: Encryptor) {
		this.userRepository = userRepository;
		this.encryptor = encryptor;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const { hash, salt } = await this.encryptor.encrypt(payload.password);

		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				name: payload.name,
				passwordHash: hash,
				passwordSalt: salt,
			}),
		);

		return item.toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async findByEmail(
		email: UserEntity["email"],
	): Promise<null | UserGetOneResponseDto> {
		const item = await this.userRepository.findByEmail(email);
		return item ? item.toObject() : null;
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { UserService };
