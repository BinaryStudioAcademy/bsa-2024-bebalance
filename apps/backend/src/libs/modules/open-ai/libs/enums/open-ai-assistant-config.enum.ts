import {
	AnalyzeBalanceScoresTool,
	GenerateTaskByCategoryTool,
} from "../ai-assistant-tools/ai-assistant-tools.js";
import { OpenAiPromptTemplates } from "./open-ai-prompt-messages.enum.js";

const OpenAiAssistantConfig = {
	INSTRUCTION: OpenAiPromptTemplates.ASSISTANT_INSTRUCTION,
	NAME: "Wheel of Balance Assistant",
	TEMPERATURE: 1,
	TOOLS: [AnalyzeBalanceScoresTool, GenerateTaskByCategoryTool],
	TOP_P: 1,
} as const;

export { OpenAiAssistantConfig };
