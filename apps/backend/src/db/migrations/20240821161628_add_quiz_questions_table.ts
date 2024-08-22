import { type Knex } from "knex";

const TableName = {
	CATEGORIES: "categories",
	QUIZ_QUESTIONS: "quiz_questions",
} as const;

const ColumnName = {
	CATEGORY_ID: "category_id",
	CREATED_AT: "created_at",
	ID: "id",
	LABEL: "label",
	UPDATED_AT: "updated_at",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.QUIZ_QUESTIONS, (table) => {
		table.increments(ColumnName.ID).primary();
		table.text(ColumnName.LABEL).notNullable().unique();
		table
			.integer(ColumnName.CATEGORY_ID)
			.references(ColumnName.ID)
			.inTable(TableName.CATEGORIES)
			.notNullable();
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
	return knex.schema.dropTableIfExists(TableName.QUIZ_QUESTIONS);
}

export { down, up };
