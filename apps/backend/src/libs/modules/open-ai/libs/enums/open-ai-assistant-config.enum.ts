import { AnalyzeBalanceScores } from "../ai-assistant-tools/ai-assistant-tools.js";
import { OpenAiPromptTemplates } from "./open-ai-promt-mesagges.enum.js";

const OpenAiAssistantConfig = {
	INSTRUCTION: OpenAiPromptTemplates.ASSISTANT_INSTRUCTION,
	NAME: "Wheel of Balance Assistant",
	TOOLS: [AnalyzeBalanceScores],
} as const;

export { OpenAiAssistantConfig };
