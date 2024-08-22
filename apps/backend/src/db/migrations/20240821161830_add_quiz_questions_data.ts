import { type Knex } from "knex";

type Category = {
	id: number;
	name: string;
};

type QuizQuestion = {
	[ColumnName.CATEGORY_ID]: number;
	[ColumnName.LABEL]: string;
};

const TableName = {
	CATEGORIES: "categories",
	QUIZ_QUESTIONS: "quiz_questions",
} as const;

const Categories = {
	FREE_TIME: "Free time",
	FRIENDS: "Friends",
	LOVE: "Love",
	MENTAL: "Mental",
	MONEY: "Money",
	PHYSICAL: "Physical",
	SPIRITUAL: "Spiritual",
	WORK: "Work",
} as const;

const ColumnName = {
	CATEGORY_ID: "category_id",
	CREATED_AT: "created_at",
	ID: "id",
	LABEL: "label",
	NAME: "name",
	UPDATED_AT: "updated_at",
} as const;

const QUIZ_QUESTIONS = {
	[Categories.FREE_TIME]: [
		"How satisfied are you with the amount of free time you have?",
		"How often do you engage in hobbies or leisure activities?",
		"How much do you enjoy your free time?",
	],
	[Categories.FRIENDS]: [
		"How satisfied are you with the quality of your friendships?",
		"How often do you spend time with your friends?",
		"How supported do you feel by your friends?",
	],
	[Categories.LOVE]: [
		"How satisfied are you with your romantic relationship(s)?",
		"How well do you communicate with your partner?",
		"How much quality time do you spend with your partner?",
	],
	[Categories.MENTAL]: [
		"How would you rate your overall mental health?",
		"How well do you manage stress and anxiety?",
		"How often do you practice mindfulness or other mental health techniques?",
	],
	[Categories.MONEY]: [
		"How satisfied are you with your financial situation?",
		"How well do you manage your personal finances?",
		"How confident are you in your financial future?",
	],
	[Categories.PHYSICAL]: [
		"How often do you engage in physical exercise each week?",
		"How would you rate your overall physical health and fitness?",
		"How balanced is your diet and nutrition?",
	],
	[Categories.SPIRITUAL]: [
		"How connected do you feel to your spiritual beliefs or practices?",
		"How often do you engage in spiritual or reflective practices (e.g., meditation, prayer)?",
		"How much fulfillment do you derive from your spiritual practices?",
	],
	[Categories.WORK]: [
		"How satisfied are you with your current job or career?",
		"How well do you manage work-related stress?",
		"How effectively do you balance your work responsibilities with personal life?",
	],
};

async function up(knex: Knex): Promise<void> {
	const categories: Category[] = await knex<Category>(TableName.CATEGORIES)
		.select(ColumnName.ID, ColumnName.NAME)
		.whereIn(ColumnName.NAME, Object.values(Categories));

	const categoryIdByLabel: Record<string, number> = Object.fromEntries(
		categories.map((category) => [category.name, category.id]),
	);

	const quizQuestions: QuizQuestion[] = Object.entries(QUIZ_QUESTIONS).flatMap(
		([category, questionLabels]) =>
			questionLabels.map((label) => ({
				category_id: categoryIdByLabel[category] as number,
				label,
			})),
	);

	await knex<QuizQuestion>(TableName.QUIZ_QUESTIONS).insert(quizQuestions);
}

function down(knex: Knex): Promise<void> {
	const questionLabels = Object.values(QUIZ_QUESTIONS).flat();

	return knex<QuizQuestion>(TableName.QUIZ_QUESTIONS)
		.whereIn(ColumnName.LABEL, questionLabels)
		.del();
}

export { down, up };
