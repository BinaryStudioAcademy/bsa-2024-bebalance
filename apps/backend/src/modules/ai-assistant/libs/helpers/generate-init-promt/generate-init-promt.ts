import { ZERO_INDEX } from "~/libs/constants/constants.js";
import {
	type OpenAiRequestMessage,
	OpenAiRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";
import { OpenAiPromptTemplates } from "~/libs/modules/open-ai/open-ai.js";
import { type OnboardingQuestionEntity } from "~/modules/onboarding/onboarding.js";

function generateInitPrompt(
	onboardingQuestions: OnboardingQuestionEntity[],
	userName: string,
): OpenAiRequestMessage {
	const questionsWithAnswers = onboardingQuestions.map((questionEntity) => {
		const { answers, label: question } = questionEntity.toObject();
		const answer = answers[ZERO_INDEX]?.label;

		return { answer, question };
	});

	const promptContent = `
${OpenAiPromptTemplates.ASSISTANT_INIT_THREAD_INSTRUCTION}

Here are the questions and the user's answers:

${questionsWithAnswers.map(({ answer, question }) => `- Question: ${question}\nAnswer: ${answer as string}`).join("\n")}

Make sure to analyze these answers carefully, as they will inform future task recommendations.

Always address to user : ${userName} and greet on first message.
`;

	return {
		content: promptContent,
		metadata: {},
		role: OpenAiRoleKey.USER,
	};
}

export { generateInitPrompt };
