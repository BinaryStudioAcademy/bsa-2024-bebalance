import { type Knex } from "knex";

const TableName = {
	CATEGORIES: "categories",
	QUIZ_ANSWERS: "quiz_answers",
} as const;

const ColumnName = {
	CATEGORY_ID: "category_id",
	CREATED_AT: "created_at",
	ID: "id",
	LABEL: "label",
	UPDATED_AT: "updated_at",
	VALUE: "value",
} as const;

const ValueLimits = {
	MAX: 10,
	MIN: 1,
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.QUIZ_ANSWERS, (table) => {
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
		table
			.integer(ColumnName.VALUE)
			.notNullable()
			.checkBetween([ValueLimits.MIN, ValueLimits.MAX]);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TableName.QUIZ_ANSWERS);
}

export { down, up };
