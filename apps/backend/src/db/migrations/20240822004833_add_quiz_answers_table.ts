import { type Knex } from "knex";

const TableName = {
	QUIZ_ANSWERS: "quiz_answers",
	QUIZ_QUESTIONS: "quiz_questions",
} as const;

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	LABEL: "label",
	QUESTION_ID: "question_id",
	UPDATED_AT: "updated_at",
	VALUE: "value",
} as const;

const ValueLimits = {
	MAX: 10,
	MIN: 1,
} as const;

const DELETE_STRATEGY = "CASCADE";

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.QUIZ_ANSWERS, (table) => {
		table.increments(ColumnName.ID).primary();
		table.text(ColumnName.LABEL).notNullable();
		table
			.integer(ColumnName.QUESTION_ID)
			.references(ColumnName.ID)
			.inTable(TableName.QUIZ_QUESTIONS)
			.onDelete(DELETE_STRATEGY)
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
