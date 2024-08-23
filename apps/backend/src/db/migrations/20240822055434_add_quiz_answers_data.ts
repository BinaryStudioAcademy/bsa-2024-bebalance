import { type Knex } from "knex";

type QuizQuestion = {
	[ColumnName.ID]: number;
	[ColumnName.LABEL]: string;
};

type QuizAnswer = {
	[ColumnName.LABEL]: string;
	[ColumnName.QUESTION_ID]: number;
	[ColumnName.VALUE]: number;
};

const TableName = {
	QUIZ_ANSWERS: "quiz_answers",
	QUIZ_QUESTIONS: "quiz_questions",
} as const;

const ColumnName = {
	ID: "id",
	LABEL: "label",
	QUESTION_ID: "question_id",
	VALUE: "value",
} as const;

const VALUE_START_INDEX_OFFSET = 1;
const VALUE_MULTIPLIER = 2;

const questionToAnswers = new Map<string, string[]>([
	[
		"How balanced is your diet and nutrition?",
		["Very unbalanced", "Unbalanced", "Neutral", "Balanced", "Very balanced"],
	],
	[
		"How confident are you in your financial future?",
		[
			"Very unconfident",
			"Unconfident",
			"Neutral",
			"Confident",
			"Very confident",
		],
	],
	[
		"How connected do you feel to your spiritual beliefs or practices?",
		[
			"Not connected at all",
			"Slightly connected",
			"Neutral",
			"Connected",
			"Very connected",
		],
	],
	[
		"How effectively do you balance your work responsibilities with personal life?",
		[
			"Very ineffectively",
			"Ineffectively",
			"Neutral",
			"Effectively",
			"Very effectively",
		],
	],
	[
		"How much do you enjoy your free time?",
		["Not at all", "Slightly", "Moderately", "Much", "Very much"],
	],
	[
		"How much fulfillment do you derive from your spiritual practices?",
		["None", "Little", "Moderate", "Much", "Very much"],
	],
	[
		"How much quality time do you spend with your partner?",
		["Very little", "Little", "Moderate", "Much", "Very much"],
	],
	[
		"How often do you engage in hobbies or leisure activities?",
		[
			"Rarely or never",
			"Once a month",
			"Once a week",
			"Several times a week",
			"Daily",
		],
	],
	[
		"How often do you engage in physical exercise each week?",
		[
			"Rarely or never",
			"Once a week",
			"Two to three times a week",
			"Four to five times a week",
			"Daily",
		],
	],
	[
		"How often do you engage in spiritual or reflective practices (e.g., meditation, prayer)?",
		[
			"Rarely or never",
			"Once a month",
			"Once a week",
			"Several times a week",
			"Daily",
		],
	],
	[
		"How often do you practice mindfulness or other mental health techniques?",
		[
			"Rarely or never",
			"Once a month",
			"Once a week",
			"Several times a week",
			"Daily",
		],
	],
	[
		"How often do you spend time with your friends?",
		[
			"Rarely or never",
			"Once a month",
			"Once a week",
			"Several times a week",
			"Daily",
		],
	],
	[
		"How satisfied are you with the amount of free time you have?",
		[
			"Very dissatisfied",
			"Dissatisfied",
			"Neutral",
			"Satisfied",
			"Very satisfied",
		],
	],
	[
		"How satisfied are you with the quality of your friendships?",
		[
			"Very dissatisfied",
			"Dissatisfied",
			"Neutral",
			"Satisfied",
			"Very satisfied",
		],
	],
	[
		"How satisfied are you with your current job or career?",
		[
			"Very dissatisfied",
			"Dissatisfied",
			"Neutral",
			"Satisfied",
			"Very satisfied",
		],
	],
	[
		"How satisfied are you with your financial situation?",
		[
			"Very dissatisfied",
			"Dissatisfied",
			"Neutral",
			"Satisfied",
			"Very satisfied",
		],
	],
	[
		"How satisfied are you with your romantic relationship(s)?",
		[
			"Very dissatisfied",
			"Dissatisfied",
			"Neutral",
			"Satisfied",
			"Very satisfied",
		],
	],
	[
		"How supported do you feel by your friends?",
		[
			"Not supported at all",
			"Slightly supported",
			"Neutral",
			"Supported",
			"Very supported",
		],
	],
	[
		"How well do you communicate with your partner?",
		["Very poorly", "Poorly", "Neutral", "Well", "Very well"],
	],
	[
		"How well do you manage stress and anxiety?",
		["Very poorly", "Poorly", "Neutral", "Well", "Very well"],
	],
	[
		"How well do you manage work-related stress?",
		["Very poorly", "Poorly", "Fair", "Well", "Very well"],
	],
	[
		"How well do you manage your personal finances?",
		["Very poorly", "Poorly", "Neutral", "Well", "Very well"],
	],
	[
		"How would you rate your overall mental health?",
		["Very poor", "Poor", "Neutral", "Good", "Excellent"],
	],
	[
		"How would you rate your overall physical health and fitness?",
		["Poor", "Fair", "Good", "Very good", "Excellent"],
	],
]);

async function up(knex: Knex): Promise<void> {
	const questions: QuizQuestion[] = await knex<QuizQuestion>(
		TableName.QUIZ_QUESTIONS,
	)
		.select(ColumnName.ID, ColumnName.LABEL)
		.whereIn(ColumnName.LABEL, [...questionToAnswers.keys()]);

	const questionIdByLabel: Record<string, number> = Object.fromEntries(
		questions.map((question) => [question.label, question.id]),
	);

	const quizAnswers: QuizAnswer[] = [...questionToAnswers.entries()].flatMap(
		([questionLabel, answers]) =>
			answers.map((answerLabel, index) => ({
				[ColumnName.LABEL]: answerLabel,
				[ColumnName.QUESTION_ID]: questionIdByLabel[questionLabel] as number,
				[ColumnName.VALUE]:
					(index + VALUE_START_INDEX_OFFSET) * VALUE_MULTIPLIER,
			})),
	);

	await knex<QuizAnswer>(TableName.QUIZ_ANSWERS).insert(quizAnswers);
}

function down(knex: Knex): Promise<void> {
	const questionLabels = [...questionToAnswers.keys()];

	return knex<QuizAnswer>(TableName.QUIZ_ANSWERS)
		.whereIn(
			ColumnName.QUESTION_ID,
			knex(TableName.QUIZ_QUESTIONS)
				.select(ColumnName.ID)
				.whereIn(ColumnName.LABEL, questionLabels),
		)
		.del();
}

export { down, up };
