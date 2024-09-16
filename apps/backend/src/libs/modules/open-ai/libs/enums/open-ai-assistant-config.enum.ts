import {
	AnalyzeBalanceTool,
	ChangeTaskTool,
	SuggestTaskTool,
} from "~/libs/modules/open-ai/libs/tools/tools.js";

import { OpenAiPromptTemplates } from "./open-ai-prompt-messages.enum.js";

const OpenAiAssistantConfig = {
	INSTRUCTION: OpenAiPromptTemplates.ASSISTANT_INSTRUCTION,
	NAME: "Wheel of Balance Assistant",
	TEMPERATURE: 1,
	TOOLS: [AnalyzeBalanceTool, SuggestTaskTool, ChangeTaskTool],
	TOP_P: 1,
} as const;

export { OpenAiAssistantConfig };
