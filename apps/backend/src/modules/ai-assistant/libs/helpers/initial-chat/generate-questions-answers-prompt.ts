import { ZERO_INDEX } from "~/libs/constants/constants.js";
import {
	type OpenAiRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";
import { type OnboardingQuestionEntity } from "~/modules/onboarding/onboarding.js";

import { OpenAiInitialPromptTemplates } from "./generate-init-prompt-message.enum.js";

function generateQuestionsAnswersPrompt(
	userQuestionsWithAnswers: OnboardingQuestionEntity[],
): OpenAiRequestMessage {
	const questionsWithAnswers = userQuestionsWithAnswers.map(
		(questionEntity) => {
			const { answers, label: question } = questionEntity.toObject();
			const answer = answers[ZERO_INDEX]?.label;

			return { answer, question };
		},
	);

	const content = `
	{
	"context": "${OpenAiInitialPromptTemplates.INIT_CHAT_CONTENT}",
	"user_answers": ${JSON.stringify(questionsWithAnswers)},
	"instructions": "${OpenAiInitialPromptTemplates.INIT_CHAT_INSTRUCTION}",
	}`;

	return {
		content,
		role: OpenAIRoleKey.USER,
	};
}

export { generateQuestionsAnswersPrompt };
