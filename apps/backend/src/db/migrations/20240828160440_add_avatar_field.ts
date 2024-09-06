import { type Knex } from "knex";

const TableName = {
	FILES: "files",
	USER_DETAILS: "user_details",
} as const;

const ColumnName = {
	AVATAR_FILE_ID: "avatar_file_id",
	ID: "id",
} as const;

const DELETE_STRATEGY = "CASCADE";

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
		table
			.integer(ColumnName.AVATAR_FILE_ID)
			.unique()
			.references(ColumnName.ID)
			.inTable(TableName.FILES)
			.onDelete(DELETE_STRATEGY);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.table(TableName.USER_DETAILS, (table) => {
		table.dropColumn(ColumnName.AVATAR_FILE_ID);
	});
}

export { down, up };
