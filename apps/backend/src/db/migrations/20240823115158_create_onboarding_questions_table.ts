import { type Knex } from "knex";

const TableName = "onboarding_questions";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	LABEL: "label",
	UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.LABEL).notNullable().unique();
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

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName);
}

export { down, up };
