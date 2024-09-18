import { type Knex } from "knex";

const TableName = {
	NOTES: "task_notes",
	TASKS: "tasks",
} as const;

const ColumnName = {
	CONTENT: "content",
	CREATED_AT: "created_at",
	ID: "id",
	TASK_ID: "task_id",
	UPDATED_AT: "updated_at",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.NOTES, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.TASK_ID)
			.unsigned()
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.TASKS)
			.onDelete(DELETE_STRATEGY);
		table.text(ColumnName.CONTENT).notNullable();
		table.timestamp(ColumnName.CREATED_AT).defaultTo(knex.fn.now());
		table.timestamp(ColumnName.UPDATED_AT).defaultTo(knex.fn.now());
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName.NOTES);
}

export { down, up };
