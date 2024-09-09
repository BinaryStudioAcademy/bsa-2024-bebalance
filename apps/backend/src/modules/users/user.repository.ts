import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";
import { type FileModel } from "~/modules/files/files.model.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { type UserTaskDay } from "./libs/types/types.js";
import { type UserDetailsModel } from "./user-details.model.js";
import { type UserTaskDaysModel } from "./user-task-days.model.js";

class UserRepository implements Repository {
	private fileModel: typeof FileModel;

	private userDetailsModel: typeof UserDetailsModel;

	private userModel: typeof UserModel;

	private userTaskDaysModel: typeof UserTaskDaysModel;

	public constructor({
		fileModel,
		userDetailsModel,
		userModel,
		userTaskDaysModel,
	}: {
		fileModel: typeof FileModel;
		userDetailsModel: typeof UserDetailsModel;
		userModel: typeof UserModel;
		userTaskDaysModel: typeof UserTaskDaysModel;
	}) {
		this.userModel = userModel;
		this.userDetailsModel = userDetailsModel;
		this.userTaskDaysModel = userTaskDaysModel;
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

	public async delete(id: number): Promise<boolean> {
		const rowsDeleted = await this.userModel.query().deleteById(id);

		return Boolean(rowsDeleted);
	}

	public async deleteUserTaskDays(userId: number): Promise<boolean> {
		const rowsDeleted = await this.userTaskDaysModel
			.query()
			.delete()
			.where({ userId });

		return Boolean(rowsDeleted);
	}

	public async find(id: number): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}]`,
			)
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
					notificationFrequency: user.notificationFrequency,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
					userTaskDays: user.userTaskDays.map(
						(taskDay: UserTaskDay) => taskDay.dayOfWeek,
					),
				})
			: null;
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel
			.query()
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}]`,
			);

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
					notificationFrequency: user.notificationFrequency,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
					userTaskDays: user.userTaskDays.map(
						(taskDay: UserTaskDay) => taskDay.dayOfWeek,
					),
				});
			}),
		);
	}

	public async findByEmail(email: string): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.where({ email })
			.first()
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}]`,
			);

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
		payload: Partial<UserDetailsModel>,
	): Promise<null | UserEntity> {
		const userDetails = await this.userDetailsModel
			.query()
			.findOne({ userId: id });
		const updatedUserDetails = await userDetails
			?.$query()
			.patchAndFetch(payload);
		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphFetched(RelationName.USER_TASK_DAYS);
		const avatar = await this.fileModel
			.query()
			.findById(updatedUserDetails?.avatarFileId as number);

		return user && updatedUserDetails
			? UserEntity.initialize({
					avatarFileId: updatedUserDetails.avatarFileId,
					avatarUrl: avatar?.url ?? null,
					createdAt: user.createdAt,
					email: user.email,
					id: user.id,
					name: updatedUserDetails.name,
					notificationFrequency: updatedUserDetails.notificationFrequency,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
					userTaskDays: user.userTaskDays.map(
						(taskDay: UserTaskDay) => taskDay.dayOfWeek,
					),
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

		const userDetails = (await this.userDetailsModel
			.query()
			.patch({ avatarFileId: avatarFile?.id as number })
			.where({ userId: id })
			.returning("*")
			.first()) as UserDetailsModel;

		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}]`,
			);

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
					notificationFrequency: userDetails.notificationFrequency,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
					userTaskDays: user.userTaskDays.map(
						(taskDay: UserTaskDay) => taskDay.dayOfWeek,
					),
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

	public async updateUserTaskDays(
		id: number,
		userTaskDays: number[],
	): Promise<void> {
		await this.deleteUserTaskDays(id);

		await this.userTaskDaysModel.query().insert(
			userTaskDays.map((day) => {
				return { dayOfWeek: day, userId: id };
			}),
		);
	}
}

export { UserRepository };
