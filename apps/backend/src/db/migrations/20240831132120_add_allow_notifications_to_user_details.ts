import { type Knex } from "knex";

const TableName = {
	USER_DETAILS: "user_details",
} as const;

const ColumnName = {
	ALLOW_NOTIFICATIONS: "allow_notifications",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
		table
			.boolean(ColumnName.ALLOW_NOTIFICATIONS)
			.notNullable()
			.defaultTo(false);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
		table.dropColumn(ColumnName.ALLOW_NOTIFICATIONS);
	});
}

export { down, up };
