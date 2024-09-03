import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { type UserDetailsModel } from "./user-details.model.js";
import { type UserTaskDaysModel } from "./user-task-days.model.js";

class UserRepository implements Repository {
	private userDetailsModel: typeof UserDetailsModel;

	private userModel: typeof UserModel;

	private userTaskDaysModel: typeof UserTaskDaysModel;

	public constructor(
		userModel: typeof UserModel,
		userDetailsModel: typeof UserDetailsModel,
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
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}]`,
			)
			.findById(id);

		return user
			? UserEntity.initialize({
					allowNotifications: user.allowNotifications,
					createdAt: user.createdAt,
					email: user.email,
					id: user.id,
					name: user.userDetails.name,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					updatedAt: user.updatedAt,
					userTaskDays: user.userTaskDays.map(
						(taskDay: { dayOfWeek: number }) => taskDay.dayOfWeek,
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

		return users.map((user) =>
			UserEntity.initialize({
				allowNotifications: user.allowNotifications,
				createdAt: user.createdAt,
				email: user.email,
				id: user.id,
				name: user.userDetails.name,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				updatedAt: user.updatedAt,
				userTaskDays: user.userTaskDays.map(
					(taskDay: { dayOfWeek: number }) => taskDay.dayOfWeek,
				),
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

		return user
			? UserEntity.initialize({
					allowNotifications: user.allowNotifications,
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

	public async update(
		id: number,
		payload: Partial<UserModel>,
	): Promise<UserEntity> {
		const user = await this.userModel
			.query()
			.patchAndFetchById(id, payload)
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}]`,
			);

		return UserEntity.initialize({
			allowNotifications: user.allowNotifications,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.userDetails.name,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays.map(
				(taskDay: { dayOfWeek: number }) => taskDay.dayOfWeek,
			),
		});
	}

	public async updateUserDetails(
		id: number,
		payload: Partial<UserDetailsModel>,
	): Promise<null | UserEntity> {
		await this.userDetailsModel.query().patch(payload).where({ userId: id });

		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphFetched(
				`[${RelationName.USER_DETAILS}, ${RelationName.USER_TASK_DAYS}]`,
			);

		if (!user) {
			return null;
		}

		return UserEntity.initialize({
			allowNotifications: user.userDetails.allowNotifications,
			createdAt: user.createdAt,
			email: user.email,
			id: user.id,
			name: user.userDetails.name,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			updatedAt: user.updatedAt,
			userTaskDays: user.userTaskDays.map(
				(taskDay: { dayOfWeek: number }) => taskDay.dayOfWeek,
			),
		});
	}

	public async updateUserTaskDays(
		id: number,
		userTaskDays: number[],
	): Promise<void> {
		await this.userTaskDaysModel.query().delete().where({ userId: id });

		await this.userTaskDaysModel.query().insert(
			userTaskDays.map((day) => {
				return { dayOfWeek: day, userId: id };
			}),
		);
	}
}

export { UserRepository };
