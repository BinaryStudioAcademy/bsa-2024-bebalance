import { type Knex } from "knex";

const TableName = {
	CHAT_MESSAGES: "chat_messages",
	USER_DETAILS: "user_details",
} as const;

const ColumnName = {
	AUTHOR: "author",
	CREATED_AT: "created_at",
	ID: "id",
	IS_READ: "is_read",
	TASK: "task",
	TEXT: "text",
	THREAD_ID: "thread_id",
	TYPE: "type",
} as const;

const ChatMessageType = {
	TASK: "task",
	TEXT: "text",
} as const;

const ChatMessageAuthor = {
	ASSISTANT: "assistant",
	USER: "user",
} as const;

const DELETE_STRATEGY = "CASCADE";

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.CHAT_MESSAGES, (table) => {
		table.integer(ColumnName.ID).primary();
		table.timestamp(ColumnName.CREATED_AT).defaultTo(knex.fn.now());
		table
			.enum(ColumnName.AUTHOR, [
				ChatMessageAuthor.ASSISTANT,
				ChatMessageAuthor.USER,
			])
			.notNullable();
		table.boolean(ColumnName.IS_READ).notNullable().defaultTo(false);
		table
			.enum(ColumnName.TYPE, [ChatMessageType.TASK, ChatMessageType.TEXT])
			.notNullable();
		table.string(ColumnName.TEXT);
		table.json(ColumnName.TASK);
		table
			.string(ColumnName.THREAD_ID)
			.notNullable()
			.references(ColumnName.THREAD_ID)
			.inTable(TableName.USER_DETAILS)
			.onDelete(DELETE_STRATEGY);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TableName.CHAT_MESSAGES);
}

export { down, up };
