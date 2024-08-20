import { type Knex } from "knex";

const TableName = { USER_DETAILS: "user_details", USERS: "users" } as const;

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	NAME: "name",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.USER_DETAILS, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.USER_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.notNullable();
		table.string(ColumnName.NAME).notNullable();
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TableName.USER_DETAILS);
}

export { down, up };
