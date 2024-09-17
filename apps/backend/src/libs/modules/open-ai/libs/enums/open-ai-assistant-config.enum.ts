import {
	AnalyzeBalanceTool,
	ChangeTaskTool,
	SuggestTaskTool,
} from "../../libs/tools/tools.js";
import { OpenAIPromptTemplate } from "./open-ai-prompt-messages.enum.js";

const OpenAIAssistantConfig = {
	INSTRUCTION: OpenAIPromptTemplate.ASSISTANT_INSTRUCTION,
	NAME: "Wheel of Balance Assistant",
	TEMPERATURE: 1,
	TOOLS: [AnalyzeBalanceTool, SuggestTaskTool, ChangeTaskTool],
	TOP_P: 1,
} as const;

export { OpenAIAssistantConfig };
