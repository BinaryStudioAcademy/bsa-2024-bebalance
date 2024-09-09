import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";
import { type FileModel } from "~/modules/files/files.model.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { MINIMAL_LENGTH } from "./libs/constants/constants.js";
import { type UserUpdateRequestDto } from "./libs/types/types.js";
import { type UserDetailsModel } from "./user-details.model.js";

class UserRepository implements Repository {
	private fileModel: typeof FileModel;

	private userDetailsModel: typeof UserDetailsModel;

	private userModel: typeof UserModel;

	public constructor(
		userModel: typeof UserModel,
		userDetailsModel: typeof UserDetailsModel,
		fileModel: typeof FileModel,
	) {
		this.userModel = userModel;
		this.userDetailsModel = userDetailsModel;
		this.fileModel = fileModel;
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const { email, name, passwordHash, passwordSalt } = entity.toNewObject();

		const user = await this.userModel
			.query()
			.insert({
				email,
				passwordHash,
				passwordSalt,
			})
			.returning("*");

		const userDetails = await this.userDetailsModel
			.query()
			.insert({
				name,
				userId: user.id,
			})
			.returning("*");

		const avatar = await this.fileModel
			.query()
			.findById(userDetails.avatarFileId)
			.execute();

		return UserEntity.initialize({
			avatarFileId: avatar?.id ?? null,
			avatarUrl: avatar?.url ?? null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: userDetails.name,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
		});
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.withGraphFetched(RelationName.USER_DETAILS)
			.findById(id);

		const avatar = user?.userDetails.avatarFileId
			? await this.fileModel
					.query()
					.findById(user.userDetails.avatarFileId)
					.first()
					.execute()
			: null;

		return user
			? UserEntity.initialize({
					avatarFileId: avatar?.id ?? null,
					avatarUrl: avatar?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					id: user.id,
					name: user.userDetails.name,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel
			.query()
			.withGraphFetched(RelationName.USER_DETAILS);

		return await Promise.all(
			users.map(async (user) => {
				const avatar = user.userDetails.avatarFileId
					? await this.fileModel.query().findById(user.userDetails.avatarFileId)
					: null;

				return UserEntity.initialize({
					avatarFileId: avatar?.id ?? null,
					avatarUrl: avatar?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					id: user.id,
					name: user.userDetails.name,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				});
			}),
		);
	}

	public async findByEmail(email: string): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.where({ email })
			.withGraphFetched(RelationName.USER_DETAILS)
			.first();

		if (!user) {
			return null;
		}

		const avatar = user.userDetails.avatarFileId
			? await this.fileModel.query().findById(user.userDetails.avatarFileId)
			: null;

		return UserEntity.initialize({
			avatarFileId: avatar?.id ?? null,
			avatarUrl: avatar?.url ?? null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.userDetails.name,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
		});
	}

	public async update(
		id: number,
		payload: Partial<UserUpdateRequestDto>,
	): Promise<null | UserEntity> {
		const { name } = payload;

		const userDetailsUpdateData: Partial<UserDetailsModel> = {
			...(name && { name }),
		};

		if (Object.keys(userDetailsUpdateData).length > MINIMAL_LENGTH) {
			await this.userDetailsModel
				.query()
				.patch(userDetailsUpdateData)
				.where({ userId: id });
		}

		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphFetched(RelationName.USER_DETAILS);

		const avatar = user?.userDetails.avatarFileId
			? await this.fileModel.query().findById(user.userDetails.avatarFileId)
			: null;

		return user
			? UserEntity.initialize({
					avatarFileId: avatar?.id ?? null,
					avatarUrl: avatar?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					id: user.id,
					name: user.userDetails.name,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async updateAvatar(
		id: number,
		payload: Partial<FileModel>,
	): Promise<null | UserEntity> {
		const avatarFile = await this.fileModel
			.query()
			.findOne({ url: payload.url });

		await this.userDetailsModel
			.query()
			.patch({ avatarFileId: avatarFile?.id as number })
			.where({ userId: id });

		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphFetched(RelationName.USER_DETAILS);

		const avatar = user?.userDetails.avatarFileId
			? await this.fileModel.query().findById(user.userDetails.avatarFileId)
			: null;

		return user
			? UserEntity.initialize({
					avatarFileId: avatar?.id ?? null,
					avatarUrl: avatar?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					id: user.id,
					name: user.userDetails.name,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async updatePassword(
		id: number,
		passwordPayload: { passwordHash: string; passwordSalt: string },
	): Promise<UserEntity> {
		const user = await this.userModel
			.query()
			.withGraphFetched(RelationName.USER_DETAILS)
			.patchAndFetchById(id, passwordPayload);

		const avatar = await this.fileModel
			.query()
			.findById(user.userDetails.avatarFileId);

		return UserEntity.initialize({
			avatarFileId: avatar?.id ?? null,
			avatarUrl: avatar?.url ?? null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.userDetails.name,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
		});
	}
}

export { UserRepository };
