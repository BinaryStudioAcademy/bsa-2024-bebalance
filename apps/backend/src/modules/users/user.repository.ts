import { transaction } from "objection";

import { RelationName } from "~/libs/enums/relation-name.enum.js";
import { type Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { UserDetailsModel } from "./user-details.model.js";

class UserRepository implements Repository {
	private userDetailsModel: typeof UserDetailsModel;

	private userModel: typeof UserModel;

	public constructor(
		userModel: typeof UserModel,
		userDetailsModel: typeof UserDetailsModel,
	) {
		this.userModel = userModel;
		this.userDetailsModel = userDetailsModel;
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const { email, name, passwordHash, passwordSalt } = entity.toNewObject();

		const userWithDetails = await transaction(
			this.userModel.knex(),
			async (trx) => {
				const user = await this.userModel
					.query(trx)
					.insert({
						email,
						passwordHash,
						passwordSalt,
					})
					.returning("*");

				const details = await this.userDetailsModel
					.query(trx)
					.insert({
						name,
						userId: user.id,
					})
					.returning("*");

				return { ...user, ...details };
			},
		);

		return UserEntity.initialize(userWithDetails);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel
			.query()
			.withGraphFetched(RelationName.USER_DETAILS)
			.execute();

		return users.map((user) =>
			UserEntity.initialize({
				...user,
				...user.userDetails,
			}),
		);
	}

	public async findByEmail(
		email: UserEntity["email"],
	): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.withGraphFetched(RelationName.USER_DETAILS)
			.where({ email })
			.first()
			.execute();
		return user
			? UserEntity.initialize({ ...user, ...user.userDetails })
			: null;
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { UserRepository };
