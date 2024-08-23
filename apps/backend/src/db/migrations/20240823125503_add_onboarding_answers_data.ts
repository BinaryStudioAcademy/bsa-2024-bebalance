import { type Knex } from "knex";

const TABLE_NAME = {
	ONBOARDING_ANSWERS: "onboarding_answers",
	ONBOARDING_QUESTIONS: "onboarding_questions",
} as const;

const ColumnName = {
	ANSWER: "answer",
} as const;

const ANSWERS = [
	[
		"A. Family and relationships",
		"B. Career and professional growth",
		"C. Personal development and learning",
		"D. Health and well-being",
		"E. Financial stability",
	],
	[
		"A. Parent or caregiver",
		"B. Professional or student",
		"C. Partner or spouse",
		"D. Friend or community member",
		"E. Individual focused on personal growth",
	],
	["A. Yes", "B. No"],
	[
		"A. Balancing work and personal life",
		"B. Maintaining healthy relationships",
		"C. Managing stress and well-being",
		"D. Pursuing personal goals or hobbies",
		"E. Financial planning and stability",
	],
	[
		"A. Achieve a healthier lifestyle",
		"B. Develop stronger connections with loved ones",
		"C. Gain clarity in career direction",
		"D. Improve financial planning",
		"E. Enhance personal or spiritual growth",
	],
	[
		"A. Reflective journaling",
		"B. Physical exercise or wellness routines",
		"D. Creative activities (e.g., art, music)",
		"E. Setting and achieving small goals",
	],
];

async function up(knex: Knex): Promise<void> {
	await knex.transaction(async (transaction) => {
		const questions: { id: number }[] = await transaction(
			TABLE_NAME.ONBOARDING_QUESTIONS,
		).select("id");

		const answerInserts = questions.flatMap((question, index) => {
			return ANSWERS[index]?.map((answer) => ({
				answer,
				question_id: question.id,
			}));
		});

		await knex(TABLE_NAME.ONBOARDING_ANSWERS).insert(answerInserts);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.transaction(async (transaction) => {
		for (const answerGroup of ANSWERS) {
			await transaction(TABLE_NAME.ONBOARDING_ANSWERS)
				.whereIn(ColumnName.ANSWER, answerGroup)
				.delete();
		}
	});
}

export { down, up };
