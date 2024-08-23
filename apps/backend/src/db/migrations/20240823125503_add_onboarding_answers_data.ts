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
		"Family and relationships",
		"Career and professional growth",
		"Personal development and learning",
		"Health and well-being",
		"Financial stability",
	],
	[
		"Parent or caregiver",
		"Professional or student",
		"Partner or spouse",
		"Friend or community member",
		"Individual focused on personal growth",
	],
	["Yes", "No"],
	[
		"Balancing work and personal life",
		"Maintaining healthy relationships",
		"Managing stress and well-being",
		"Pursuing personal goals or hobbies",
		"Financial planning and stability",
	],
	[
		"Achieve a healthier lifestyle",
		"Develop stronger connections with loved ones",
		"Gain clarity in career direction",
		"Improve financial planning",
		"Enhance personal or spiritual growth",
	],
	[
		"Reflective journaling",
		"Physical exercise or wellness routines",
		"Creative activities (e.g., art, music)",
		"Setting and achieving small goals",
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
