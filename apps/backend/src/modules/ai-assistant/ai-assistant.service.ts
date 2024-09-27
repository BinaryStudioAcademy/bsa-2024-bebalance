import { type OpenAI, OpenAIRoleKey } from "~/libs/modules/open-ai/open-ai.js";
import { type UserDto } from "~/libs/types/types.js";
import { type CategoryService } from "~/modules/categories/categories.js";
import { type ChatMessageService } from "~/modules/chat-message/chat-message.service.js";
import { type OnboardingRepository } from "~/modules/onboarding/onboarding.js";
import { type TaskService } from "~/modules/tasks/tasks.js";
import { type UserService } from "~/modules/users/users.js";

import {
	generateChangeTasksSuggestionsResponse,
	generateExplainTasksSuggestionsResponse,
	generateQuestionsAnswersPrompt,
	generateTasksSuggestionsResponse,
	generateUserScoresPrompt,
	runChangeTasksByCategoryOptions,
	runExplainTaskOptions,
	runSuggestTaskByCategoryOptions,
} from "./libs/helpers/helpers.js";
import {
	type AIAssistantAcceptTaskRequestDto,
	type AIAssistantChangeTaskRequestDto,
	type AIAssistantChatInitializeResponseDto,
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantExplainTaskRequestDto,
	type AIAssistantResponseDto,
	type AIAssistantSuggestTaskRequestDto,
	type ChatMessageDto,
	type TaskDto,
	type ThreadMessageCreateDto,
} from "./libs/types/types.js";

type Constructor = {
	categoryService: CategoryService;
	chatMessageService: ChatMessageService;
	onboardingRepository: OnboardingRepository;
	openAI: OpenAI;
	taskService: TaskService;
	userService: UserService;
};

class AIAssistantService {
	private categoryService: CategoryService;
	private chatMessageService: ChatMessageService;
	private onboardingRepository: OnboardingRepository;
	private openAI: OpenAI;
	private taskService: TaskService;
	private userService: UserService;

	public constructor({
		categoryService,
		chatMessageService,
		onboardingRepository,
		openAI,
		taskService,
		userService,
	}: Constructor) {
		this.openAI = openAI;
		this.categoryService = categoryService;
		this.chatMessageService = chatMessageService;
		this.onboardingRepository = onboardingRepository;
		this.taskService = taskService;
		this.userService = userService;
	}

	public async acceptTask(
		user: UserDto,
		body: AIAssistantAcceptTaskRequestDto,
	): Promise<TaskDto> {
		const { messages, task } = body;
		const threadId = user.threadId as string;

		await this.chatMessageService.saveAllTextMessages(messages, threadId);

		const newTask = await this.taskService.create({
			categoryId: task.categoryId,
			description: task.description,
			label: task.label,
			user,
		});
		const chatMessage = {
			content: `User has accepted this task: ${JSON.stringify(newTask)}`,
			role: OpenAIRoleKey.USER,
		};

		await this.openAI.addMessageToThread(threadId, chatMessage);

		return newTask;
	}

	public async acceptTasks(
		user: UserDto,
		body: AIAssistantCreateMultipleTasksDto,
	): Promise<boolean[]> {
		const { messages, tasks } = body;
		const threadId = user.threadId as string;

		await this.chatMessageService.saveAllTextMessages(messages, threadId);

		return await Promise.all(
			tasks.map(async (task) => {
				const newTask = await this.taskService.create({
					categoryId: task.categoryId,
					description: task.description,
					label: task.label,
					user,
				});

				const chatMessage = {
					content: `User has accepted this task: ${JSON.stringify(newTask)}`,
					role: OpenAIRoleKey.USER,
				};

				await this.openAI.addMessageToThread(threadId, chatMessage);

				return true;
			}),
		);
	}

	public async addMessageToThread(
		body: ThreadMessageCreateDto,
		user: UserDto,
	): Promise<boolean> {
		const { text } = body;
		const threadId = user.threadId as string;

		const prompt = {
			content: text,
			role: OpenAIRoleKey.USER,
		};

		return await this.openAI.addMessageToThread(threadId, prompt);
	}

	public async changeTasksSuggestion(
		user: UserDto,
		body: AIAssistantChangeTaskRequestDto,
	): Promise<AIAssistantResponseDto | null> {
		const { messages, tasks } = body;
		const threadId = user.threadId as string;

		await this.chatMessageService.saveAllTextMessages(messages, threadId);

		const runThreadOptions = runChangeTasksByCategoryOptions(tasks);

		const result = await this.openAI.runThread(threadId, runThreadOptions);

		const response = generateChangeTasksSuggestionsResponse(result);

		if (!response) {
			return null;
		}

		const responseMessages: ChatMessageDto[] = [];

		for (const message of response) {
			responseMessages.push(await this.chatMessageService.create(message));
		}

		return {
			messages: responseMessages,
		};
	}

	public async explainTaskSuggestion(
		body: AIAssistantExplainTaskRequestDto,
		user: UserDto,
	): Promise<AIAssistantResponseDto | null> {
		const { messages, tasks } = body;
		const threadId = user.threadId as string;

		await this.chatMessageService.saveAllTextMessages(messages, threadId);

		const runThreadOptions = runExplainTaskOptions(tasks);

		const result = await this.openAI.runThread(threadId, runThreadOptions);

		const response = generateExplainTasksSuggestionsResponse(result);

		if (!response) {
			return null;
		}

		const responseMessages: ChatMessageDto[] = [];

		for (const message of response) {
			responseMessages.push(await this.chatMessageService.create(message));
		}

		return {
			messages: responseMessages,
		};
	}

	public async initializeNewChat(
		user: UserDto,
	): Promise<AIAssistantChatInitializeResponseDto | null> {
		if (user.threadId) {
			const messages = await this.chatMessageService.findByThreadId(
				user.threadId,
			);

			return {
				messages,
				threadId: user.threadId,
			};
		}

		const userQuestionsWithAnswers =
			await this.onboardingRepository.findUserAnswersWithQuestions(user.id);

		const userWheelBalanceScores = await this.categoryService.findUserScores(
			user.id,
		);

		const initPrompt = generateQuestionsAnswersPrompt(userQuestionsWithAnswers);
		const threadId = await this.openAI.createThread([initPrompt]);
		await this.userService.saveThreadId(user.id, threadId);
		const userScoresPrompt = generateUserScoresPrompt(userWheelBalanceScores);
		await this.openAI.addMessageToThread(threadId, userScoresPrompt);

		return {
			messages: [],
			threadId,
		};
	}

	public async suggestTasksForCategories(
		body: AIAssistantSuggestTaskRequestDto,
		user: UserDto,
	): Promise<AIAssistantResponseDto | null> {
		const { categories, messages } = body;
		const threadId = user.threadId as string;

		await this.chatMessageService.saveAllTextMessages(messages, threadId);

		const runThreadOptions = runSuggestTaskByCategoryOptions(categories);

		const result = await this.openAI.runThread(threadId, runThreadOptions);

		const response = generateTasksSuggestionsResponse(result);

		if (!response) {
			return null;
		}

		const responseMessages: ChatMessageDto[] = [];

		for (const message of response) {
			responseMessages.push(await this.chatMessageService.create(message));
		}

		return {
			messages: responseMessages,
		};
	}
}

export { AIAssistantService };
