import {
	AnalyzeBalanceTool,
	ChangeTaskTool,
	ExplainTaskTool,
	SuggestTaskTool,
} from "../../libs/tools/tools.js";
import { OpenAIPromptTemplate } from "./open-ai-prompt-template.enum.js";

const OpenAIAssistantConfig = {
	INSTRUCTION: OpenAIPromptTemplate.ASSISTANT_INSTRUCTION,
	NAME: "Wheel of Balance Assistant",
	TEMPERATURE: 1,
	TOOLS: [AnalyzeBalanceTool, SuggestTaskTool, ChangeTaskTool, ExplainTaskTool],
	TOP_P: 1,
} as const;

export { OpenAIAssistantConfig };
