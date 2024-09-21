import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";
import { UserDetailsModel } from "~/modules/users/user-details.model.js";

import {
	type ChatMessageAuthor,
	type ChatMessageType,
} from "./libs/enums/enums.js";
import { type TaskCreateDto, type TaskDto } from "./libs/types/types.js";

class ChatMessageModel extends AbstractModel {
	public author!: ValueOf<typeof ChatMessageAuthor>;

	public isRead!: boolean;

	public task!: TaskCreateDto | TaskDto;

	public text!: string;

	public threadId!: string;

	public type!: ValueOf<typeof ChatMessageType>;

	static get relationMappings(): RelationMappings {
		return {
			userDetails: {
				join: {
					from: `${DatabaseTableName.CHAT_MESSAGES}.threadId`,
					to: `${DatabaseTableName.USER_DETAILS}.threadId`,
				},
				modelClass: UserDetailsModel,
				relation: Model.HasOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.CHAT_MESSAGES;
	}
}

export { ChatMessageModel };
