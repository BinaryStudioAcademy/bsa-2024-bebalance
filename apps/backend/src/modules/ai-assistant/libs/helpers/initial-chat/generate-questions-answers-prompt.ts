import { FIRST_ITEM_INDEX } from "~/libs/constants/constants.js";
import {
	type OpenAIRequestMessage,
	OpenAIRoleKey,
} from "~/libs/modules/open-ai/open-ai.js";
import { type OnboardingQuestionEntity } from "~/modules/onboarding/onboarding.js";

import { OpenAIInitialPromptTemplate } from "./generate-init-prompt-template.enum.js";

function generateQuestionsAnswersPrompt(
	userQuestionsWithAnswers: OnboardingQuestionEntity[],
): OpenAIRequestMessage {
	const questionsWithAnswers = userQuestionsWithAnswers.map(
		(questionEntity) => {
			const { answers, label: question } = questionEntity.toObject();
			const answer = answers[FIRST_ITEM_INDEX]?.label;

			return { answer, question };
		},
	);

	const content = `
	{
	"context": "${OpenAIInitialPromptTemplate.INIT_CHAT_CONTENT}",
	"user_answers": ${JSON.stringify(questionsWithAnswers)},
	"instructions": "${OpenAIInitialPromptTemplate.INIT_CHAT_INSTRUCTION}",
	}`;

	return {
		content,
		role: OpenAIRoleKey.USER,
	};
}

export { generateQuestionsAnswersPrompt };
