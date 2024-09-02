import { type Knex } from "knex";

const TableName = {
	FILES: "files",
	USER_DETAILS: "user_details",
} as const;

const ColumnName = {
	AVATAR: "avatar_file_id",
	ID: "id",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
		table
			.integer(ColumnName.AVATAR)
			.unique()
			.references(ColumnName.ID)
			.inTable(TableName.FILES)
			.onDelete("SET NULL");
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.table(TableName.USER_DETAILS, (table) => {
		table.dropColumn(ColumnName.AVATAR);
	});
}

export { down, up };
