import { type Knex } from "knex";

const TableName = {
	USER_TASK_DAYS: "user_task_days",
	USERS: "users",
} as const;

const ColumnName = {
	CREATED_AT: "created_at",
	DAY_OF_WEEK: "day_of_week",
	ID: "id",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const DELETE_STRATEGY = "CASCADE";
const MIN_DAY_OF_WEEK = 1;
const MAX_DAY_OF_WEEK = 7;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.USER_TASK_DAYS, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.USER_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.onDelete(DELETE_STRATEGY)
			.notNullable();
		table
			.integer(ColumnName.DAY_OF_WEEK)
			.notNullable()
			.checkBetween([[MIN_DAY_OF_WEEK, MAX_DAY_OF_WEEK]]);
		table.timestamp(ColumnName.CREATED_AT).defaultTo(knex.fn.now());
		table.timestamp(ColumnName.UPDATED_AT).defaultTo(knex.fn.now());
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TableName.USER_TASK_DAYS);
}

export { down, up };
