import { type OpenAI, OpenAIRoleKey } from "~/libs/modules/open-ai/open-ai.js";
import { type UserDto } from "~/libs/types/types.js";
import { type CategoryService } from "~/modules/categories/categories.js";
import { type ChatMessageService } from "~/modules/chat-message/chat-message.service.js";
import { type OnboardingRepository } from "~/modules/onboarding/onboarding.js";
import { type TaskService } from "~/modules/tasks/tasks.js";
import { type UserService } from "~/modules/users/users.js";

import { ChatMessageAuthor, ChatMessageType } from "./libs/enums/enums.js";
import {
	generateChangeTaskSuggestionsResponse,
	generateExplainTaskSuggestionsResponse,
	generateQuestionsAnswersPrompt,
	generateTaskSuggestionsResponse,
	generateUserScoresPrompt,
	runChangeTaskByCategoryOptions,
	runExplainTaskOptions,
	runSuggestTaskByCategoryOptions,
} from "./libs/helpers/helpers.js";
import {
	type AIAssistantRequestDto,
	type AIAssistantResponseDto,
	type SelectedCategory,
	type TaskCreateDto,
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
		body: AIAssistantRequestDto,
	): Promise<TaskDto> {
		const { payload, threadId } = body;
		const task = payload as TaskCreateDto;

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

	public async addMessageToThread(
		body: ThreadMessageCreateDto,
	): Promise<boolean> {
		const { text, threadId } = body;

		const prompt = {
			content: text,
			role: OpenAIRoleKey.USER,
		};

		return await this.openAI.addMessageToThread(threadId, prompt);
	}

	public async changeTaskSuggestion(
		user: UserDto,
		body: AIAssistantRequestDto,
	): Promise<AIAssistantResponseDto | null> {
		const { payload, threadId } = body;
		const task = payload as TaskCreateDto;

		await this.chatMessageService.create({
			author: ChatMessageAuthor.USER,
			payload: { text: `Accept ${task.label} task` },
			threadId,
			type: ChatMessageType.TEXT,
		});

		const runThreadOptions = runChangeTaskByCategoryOptions(task);
		const taskDeadLine = this.taskService.calculateDeadline(
			user.userTaskDays as number[],
		);
		const result = await this.openAI.runThread(threadId, runThreadOptions);

		return generateChangeTaskSuggestionsResponse(result, taskDeadLine);
	}

	public async explainTaskSuggestion(
		body: AIAssistantRequestDto,
	): Promise<AIAssistantResponseDto | null> {
		const { payload, threadId } = body;

		const task = payload as TaskCreateDto;

		const runThreadOptions = runExplainTaskOptions(task);

		const result = await this.openAI.runThread(threadId, runThreadOptions);

		return generateExplainTaskSuggestionsResponse(result, task);
	}

	public async initializeNewChat(
		user: UserDto,
	): Promise<AIAssistantResponseDto | null> {
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
		user: UserDto,
		body: AIAssistantRequestDto,
	): Promise<AIAssistantResponseDto | null> {
		const { payload, threadId } = body;
		const categories = payload as SelectedCategory[];
		const runThreadOptions = runSuggestTaskByCategoryOptions(categories);

		const taskDeadLine = this.taskService.calculateDeadline(
			user.userTaskDays as number[],
		);

		const result = await this.openAI.runThread(threadId, runThreadOptions);

		return generateTaskSuggestionsResponse(result, taskDeadLine);
	}
}

export { AIAssistantService };
