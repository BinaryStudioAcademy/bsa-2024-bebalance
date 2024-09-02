import { type Knex } from "knex";

const TableName = {
	FILES: "files",
} as const;

const ColumnName = {
	CREATED_AT: "created_at",
	FILE_KEY: "file_key",
	ID: "id",
	UPDATED_AT: "updated_at",
	URL: "url",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.FILES, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.FILE_KEY).notNullable().unique();
		table.string(ColumnName.URL).notNullable();
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
	return knex.schema.dropTableIfExists(TableName.FILES);
}

export { down, up };
