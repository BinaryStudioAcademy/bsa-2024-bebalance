import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { type UserTaskDay } from "./libs/types/types.js";
import { type UserDetailsModel } from "./user-details.model.js";
import { type UserTaskDaysModel } from "./user-task-days.model.js";

class UserRepository implements Repository {
	private userDetailsModel: typeof UserDetailsModel;

	private userModel: typeof UserModel;

	private userTaskDaysModel: typeof UserTaskDaysModel;

	public constructor(
		userDetailsModel: typeof UserDetailsModel,
		userModel: typeof UserModel,
		userTaskDaysModel: typeof UserTaskDaysModel,
	) {
		this.userModel = userModel;
		this.userDetailsModel = userDetailsModel;
		this.userTaskDaysModel = userTaskDaysModel;
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

		return UserEntity.initialize({
			avatarFileId: userDetails.avatarFileId,
			avatarUrl: null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: userDetails.name,
			notificationFrequency: "all",
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: [],
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

		return user
			? UserEntity.initialize({
					avatarFileId: user.userDetails.avatarFileId,
					avatarUrl: null,
					createdAt: user.createdAt,
					email: user.email,
					id: user.id,
					name: user.userDetails.name,
					notificationFrequency: user.userDetails.notificationFrequency,
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

		return users.map((user) => {
			return UserEntity.initialize({
				avatarFileId: user.userDetails.avatarFileId,
				avatarUrl: null,
				createdAt: user.createdAt,
				email: user.email,
				id: user.id,
				name: user.userDetails.name,
				notificationFrequency: user.userDetails.notificationFrequency,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
				userTaskDays: user.userTaskDays.map(
					(taskDay: UserTaskDay) => taskDay.dayOfWeek,
				),
			});
		});
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

		return UserEntity.initialize({
			avatarFileId: user.userDetails.avatarFileId,
			avatarUrl: null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.userDetails.name,
			notificationFrequency: user.userDetails.notificationFrequency,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays.map(
				(taskDay: UserTaskDay) => taskDay.dayOfWeek,
			),
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

		return user && updatedUserDetails
			? UserEntity.initialize({
					avatarFileId: userDetails?.avatarFileId ?? null,
					avatarUrl: null,
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
		fileId: number,
	): Promise<null | UserEntity> {
		await this.userDetailsModel
			.query()
			.patch({ avatarFileId: fileId })
			.findOne({ userId: id });

		const userDetails = (await this.userDetailsModel
			.query()
			.findOne({ userId: id })) as UserDetailsModel;

		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}]`,
			);

		return user
			? UserEntity.initialize({
					avatarFileId: userDetails.avatarFileId,
					avatarUrl: null,
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
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}]`,
			)
			.patchAndFetchById(id, passwordPayload);

		return UserEntity.initialize({
			avatarFileId: user.userDetails.avatarFileId,
			avatarUrl: null,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.userDetails.name,
			notificationFrequency: user.userDetails.notificationFrequency,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays.map(
				(taskDay: UserTaskDay) => taskDay.dayOfWeek,
			),
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
