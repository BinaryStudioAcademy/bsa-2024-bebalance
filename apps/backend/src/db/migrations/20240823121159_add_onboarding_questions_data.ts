import { type Knex } from "knex";

const TABLE_NAME = "onboarding_questions";

const ColumnName = {
	LABEL: "label",
} as const;

const QUESTIONS = [
	"Can you tell me a bit about yourself? What’s currently important to you in your life?",
	"What are your key roles in life right now?",
	"Do you have a partner?",
	"Which areas do you feel most challenged by right now?",
	"What specific outcomes would you like to see by using the app?",
	"Are there any specific types of tasks or practices you enjoy or find particularly motivating?",
];

async function up(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).insert(
		QUESTIONS.map((question) => ({
			[ColumnName.LABEL]: question,
		})),
	);
}

async function down(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).whereIn(ColumnName.LABEL, QUESTIONS).del();
}

export { down, up };
