import { Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import {
	type UserDto,
	type UserGetAllResponseDto,
	type UserGetOneResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private encrypt: Encrypt;
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository, encrypt: Encrypt) {
		this.userRepository = userRepository;
		this.encrypt = encrypt;
	}

	public async create(
		payload: UserSignUpRequestDto,
	): Promise<UserSignUpResponseDto> {
		const { hash, salt } = await this.encrypt.encrypt(payload.password);

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

	public async find(id: number): Promise<null | UserGetOneResponseDto> {
		const item = await this.userRepository.find(id);

		return item?.toObject() || null;
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async findByEmail(email: string): Promise<null | UserDto> {
		const item = await this.userRepository.findByEmail(email);
		return item ? item.toObject() : null;
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { UserService };
