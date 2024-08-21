import { type Service } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserRepository } from "~/modules/users/user.repository.js";

import { UserDto } from "./libs/types/types.js";
import {
	type UserGetAllResponseDto,
	type UserSignUpRequestDto,
} from "./libs/types/types.js";

class UserService implements Service {
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	public async create(payload: UserSignUpRequestDto): Promise<UserDto> {
		const item = await this.userRepository.create(
			UserEntity.initializeNew({
				email: payload.email,
				passwordHash: "HASH", // TODO
				passwordSalt: "SALT", // TODO
			}),
		);

		return item.toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public async find(query: Partial<UserDto>): Promise<null | UserDto> {
		const user = await this.userRepository.find({ ...query });

		if (user) {
			return user.toObject();
		}

		return null;
	}

	public async findAll(): Promise<UserGetAllResponseDto> {
		const items = await this.userRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public findByEmail(email: string): Promise<null | UserDto> {
		return this.find({ email });
	}

	public findById(id: number): Promise<null | UserDto> {
		return this.find({ id });
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { UserService };
