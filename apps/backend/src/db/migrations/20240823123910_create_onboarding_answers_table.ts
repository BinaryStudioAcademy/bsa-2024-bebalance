import { type Knex } from "knex";

const TABLE_NAME = {
	ONBOARDING_ANSWERS: "onboarding_answers",
	ONBOARDING_QUESTIONS: "onboarding_questions",
} as const;

const ColumnName = {
	ANSWER: "answer",
	CREATED_AT: "created_at",
	ID: "id",
	QUESTION_ID: "question_id",
	UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME.ONBOARDING_ANSWERS, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.ANSWER).unique().notNullable();
		table
			.integer(ColumnName.QUESTION_ID)
			.references(ColumnName.ID)
			.inTable(TABLE_NAME.ONBOARDING_QUESTIONS)
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

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE_NAME.ONBOARDING_ANSWERS);
}

export { down, up };
