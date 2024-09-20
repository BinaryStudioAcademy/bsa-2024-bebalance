import { type Knex } from "knex";

const TABLE_NAME = "user_details";

const COLUMN_NAME = "thread_id";

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string(COLUMN_NAME);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

export { down, up };
