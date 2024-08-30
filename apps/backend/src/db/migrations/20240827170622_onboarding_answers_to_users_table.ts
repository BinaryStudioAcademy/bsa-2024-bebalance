import { type Knex } from "knex";

const TableName = {
	ONBOARDING_ANSWERS: "onboarding_answers",
	ONBOARDING_ANSWERS_TO_USERS: "onboarding_answers_to_users",
	USERS: "users",
} as const;

const ColumnName = {
	ANSWER_ID: "answer_id",
	CREATED_AT: "created_at",
	ID: "id",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const DELETE_STRATEGY = "CASCADE";

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(
		TableName.ONBOARDING_ANSWERS_TO_USERS,
		(table) => {
			table.increments(ColumnName.ID).primary();
			table
				.integer(ColumnName.USER_ID)
				.notNullable()
				.references(ColumnName.ID)
				.inTable(TableName.USERS)
				.onDelete(DELETE_STRATEGY);
			table
				.integer(ColumnName.ANSWER_ID)
				.notNullable()
				.references(ColumnName.ID)
				.inTable(TableName.ONBOARDING_ANSWERS)
				.onDelete(DELETE_STRATEGY);
			table.timestamp(ColumnName.CREATED_AT).defaultTo(knex.fn.now());
			table.timestamp(ColumnName.UPDATED_AT).defaultTo(knex.fn.now());
			table.unique([ColumnName.USER_ID, ColumnName.ANSWER_ID]);
		},
	);
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TableName.ONBOARDING_ANSWERS_TO_USERS);
}

export { down, up };
