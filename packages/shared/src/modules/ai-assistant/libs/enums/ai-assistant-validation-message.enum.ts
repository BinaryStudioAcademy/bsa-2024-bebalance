import { ChatMessageAuthor } from "../../../chats/chats.js";

const AIAssistantValidationMessage = {
	CATEGORIES_REQUIRED: "Categories are required",
	CATEGORY_ID_REQUIRED: "Category ID is required",
	CATEGORY_NAME_REQUIRED: "Category name is required",
	DESCRIPTION_REQUIRED: "Description is required",
	DUE_DATE_INVALID_FORMAT: "Due date has an invalid format",
	INVALID_MESSAGE_AUTHOR: `Invalid author. Author must be one of: ${Object.values(ChatMessageAuthor).join(", ")}.`,
	LABEL_REQUIRED: "Label is required",
	TASKS_REQUIRED: "Tasks are required",
	TEXT_REQUIRED: "Text is required",
	THREAD_ID_INVALID_FORMAT: "Thread ID has an invalid format",
	THREAD_ID_REQUIRED: "Thread ID is required",
} as const;

export { AIAssistantValidationMessage };
