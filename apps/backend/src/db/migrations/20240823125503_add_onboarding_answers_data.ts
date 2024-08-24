import { type Knex } from "knex";

type OnboardingQuestion = {
	[ColumnName.ID]: number;
	[ColumnName.LABEL]: string;
};

type OnboardingAnswer = {
	[ColumnName.LABEL]: string;
	[ColumnName.QUESTION_ID]: number;
};

const TABLE_NAME = {
	ONBOARDING_ANSWERS: "onboarding_answers",
	ONBOARDING_QUESTIONS: "onboarding_questions",
} as const;

const ColumnName = {
	ID: "id",
	LABEL: "label",
	QUESTION_ID: "question_id",
} as const;

const questionToAnswers = new Map<string, string[]>([
	[
		"Are there any specific types of tasks or practices you enjoy or find particularly motivating?",
		[
			"Reflective journaling",
			"Physical exercise or wellness routines",
			"Creative activities (e.g., art, music)",
			"Setting and achieving small goals",
		],
	],
	[
		"Can you tell me a bit about yourself? What’s currently important to you in your life?",
		[
			"Family and relationships",
			"Career and professional growth",
			"Personal development and learning",
			"Health and well-being",
			"Financial stability",
		],
	],
	["Do you have a partner?", ["Yes", "No"]],
	[
		"What are your key roles in life right now?",
		[
			"Parent or caregiver",
			"Professional or student",
			"Partner or spouse",
			"Friend or community member",
			"Individual focused on personal growth",
		],
	],
	[
		"What specific outcomes would you like to see by using the app?",
		[
			"Achieve a healthier lifestyle",
			"Develop stronger connections with loved ones",
			"Gain clarity in career direction",
			"Improve financial planning",
			"Enhance personal or spiritual growth",
		],
	],
	[
		"Which areas do you feel most challenged by right now?",
		[
			"Balancing work and personal life",
			"Maintaining healthy relationships",
			"Managing stress and well-being",
			"Pursuing personal goals or hobbies",
			"Financial planning and stability",
		],
	],
]);

async function up(knex: Knex): Promise<void> {
	const questions: OnboardingQuestion[] = await knex<OnboardingQuestion>(
		TABLE_NAME.ONBOARDING_QUESTIONS,
	)
		.select(ColumnName.ID, ColumnName.LABEL)
		.whereIn(ColumnName.LABEL, [...questionToAnswers.keys()]);

	const questionIdByLabel: Record<string, number> = Object.fromEntries(
		questions.map((question) => [question.label, question.id]),
	);

	const onboardingAnswers: OnboardingAnswer[] = [
		...questionToAnswers.entries(),
	].flatMap(([questionLabel, answers]) =>
		answers.map((answerLabel) => ({
			[ColumnName.LABEL]: answerLabel,
			[ColumnName.QUESTION_ID]: questionIdByLabel[questionLabel] as number,
		})),
	);

	await knex(TABLE_NAME.ONBOARDING_ANSWERS).insert(onboardingAnswers);
}

function down(knex: Knex): Promise<void> {
	const questionLabels = [...questionToAnswers.keys()];

	return knex<OnboardingAnswer>(TABLE_NAME.ONBOARDING_ANSWERS)
		.whereIn(
			ColumnName.QUESTION_ID,
			knex(TABLE_NAME.ONBOARDING_QUESTIONS)
				.select(ColumnName.ID)
				.whereIn(ColumnName.LABEL, questionLabels),
		)
		.del();
}

export { down, up };
