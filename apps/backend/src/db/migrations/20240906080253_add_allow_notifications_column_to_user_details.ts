import { type Knex } from "knex";

const TABLE_NAME = "user_details";

const COLUMN_NAME = "allow_notifications";

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.string(COLUMN_NAME).notNullable().defaultTo("false");
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

export { down, up };
