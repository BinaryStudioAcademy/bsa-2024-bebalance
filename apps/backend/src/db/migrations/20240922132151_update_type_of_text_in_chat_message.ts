import { type Knex } from "knex";

const TABLE_NAME = "chat_messages";
const COLUMN_NAME = "text";

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, function (table) {
		table.text(COLUMN_NAME).alter();
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, function (table) {
		table.string(COLUMN_NAME).alter();
	});
}

export { down, up };
