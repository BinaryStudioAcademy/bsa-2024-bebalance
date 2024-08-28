import { type Knex } from "knex";

type OnboardingQuestion = {
	[ColumnName.ID]: number;
	[ColumnName.LABEL]: string;
};

const TableName = {
	ONBOARDING_ANSWERS: "onboarding_answers",
	ONBOARDING_QUESTIONS: "onboarding_questions",
} as const;

const ColumnName = {
	ID: "id",
	LABEL: "label",
	QUESTION_ID: "question_id",
} as const;

const questionLabel =
	"Are there any specific types of tasks or practices you enjoy or find particularly motivating?";
const answerLabel = "Meditation or mindfulness practices";

async function up(knex: Knex): Promise<void> {
	const question = await knex<OnboardingQuestion>(
		TableName.ONBOARDING_QUESTIONS,
	)
		.select("id")
		.where({ label: questionLabel })
		.first();

	if (question) {
		await knex(TableName.ONBOARDING_ANSWERS).insert({
			label: answerLabel,
			question_id: question.id,
		});
	}
}

async function down(knex: Knex): Promise<void> {
	const question = await knex<OnboardingQuestion>(
		TableName.ONBOARDING_QUESTIONS,
	)
		.select("id")
		.where({ label: questionLabel })
		.first();

	if (question) {
		await knex(TableName.ONBOARDING_ANSWERS)
			.where({
				question_id: question.id,
			})
			.del();
	}
}

export { down, up };
