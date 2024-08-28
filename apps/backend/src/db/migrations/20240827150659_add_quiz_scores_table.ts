import { type Knex } from "knex";

const TableName = {
	CATEGORIES: "categories",
	QUIZ_SCORES: "quiz_scores",
	USER: "users",
} as const;

const ColumnName = {
	CATEGORY_ID: "category_id",
	CREATED_AT: "created_at",
	ID: "id",
	SCORE: "score",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.QUIZ_SCORES, (table) => {
		table.increments(ColumnName.ID).primary();
		table.integer(ColumnName.SCORE).notNullable();
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
		table.unique([ColumnName.USER_ID, ColumnName.CATEGORY_ID]);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName.QUIZ_SCORES);
}

export { down, up };
