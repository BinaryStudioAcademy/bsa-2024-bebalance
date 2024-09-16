import { type Knex } from "knex";

const TableName = {
	CATEGORIES: "categories",
	TASKS: "tasks",
	USER: "users",
} as const;

const ColumnName = {
	CATEGORY_ID: "category_id",
	CREATED_AT: "created_at",
	DESCRIPTION: "description",
	DUE_DATE: "due_date",
	ID: "id",
	LABEL: "label",
	STATUS: "status",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const TaskStatus = {
	COMPLETED: "Completed",
	CURRENT: "Current",
	SKIPPED: "Skipped",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.TASKS, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.LABEL).notNullable();
		table.text(ColumnName.DESCRIPTION).notNullable();
		table
			.enum(ColumnName.STATUS, [
				TaskStatus.CURRENT,
				TaskStatus.SKIPPED,
				TaskStatus.COMPLETED,
			])
			.notNullable()
			.defaultTo(TaskStatus.CURRENT);
		table.timestamp(ColumnName.DUE_DATE).notNullable();
		table
			.integer(ColumnName.CATEGORY_ID)
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.CATEGORIES)
			.onDelete(DELETE_STRATEGY);
		table
			.integer(ColumnName.USER_ID)
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.USER)
			.onDelete(DELETE_STRATEGY);
		table.timestamp(ColumnName.CREATED_AT).defaultTo(knex.fn.now());
		table.timestamp(ColumnName.UPDATED_AT).defaultTo(knex.fn.now());
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName.TASKS);
}

export { down, up };
