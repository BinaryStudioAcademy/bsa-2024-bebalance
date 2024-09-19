import { type OpenAi, OpenAIRoleKey } from "~/libs/modules/open-ai/open-ai.js";
import { type UserDto } from "~/libs/types/types.js";
import { type CategoryService } from "~/modules/categories/categories.js";
import { type OnboardingRepository } from "~/modules/onboarding/onboarding.js";
import { type TaskService } from "~/modules/tasks/tasks.js";

import {
	generateChangeTaskSuggestionsResponse,
	generateExplainTaskSuggestionsResponse,
	generateQuestionsAnswersPrompt,
	generateScoresResponse,
	generateTaskSuggestionsResponse,
	runChangeTaskByCategoryOptions,
	runExplainTaskOptions,
	runInitialThreadOptions,
	runTaskByCategoryOptions,
} from "./libs/helpers/helpers.js";
import {
	type AIAssistantRequestDto,
	type AIAssistantResponseDto,
	type ChangeTaskSuggestionRequestDto,
	type SelectedCategory,
	type TaskCreateDto,
	type TaskDto,
	type TaskSuggestionsResponseDto,
	type ThreadMessageCreateDto,
} from "./libs/types/types.js";

type Constructor = {
	categoryService: CategoryService;
	onboardingRepository: OnboardingRepository;
	openAi: OpenAi;
	taskService: TaskService;
};

class AiAssistantService {
	private categoryService: CategoryService;
	private onboardingRepository: OnboardingRepository;
	private openAi: OpenAi;
	private taskService: TaskService;

	public constructor({
		categoryService,
		onboardingRepository,
		openAi,
		taskService,
	}: Constructor) {
		this.openAi = openAi;
		this.categoryService = categoryService;
		this.onboardingRepository = onboardingRepository;
		this.taskService = taskService;
	}

	public async acceptTask(
		user: UserDto,
		body: ChangeTaskSuggestionRequestDto,
	): Promise<TaskDto> {
		const { task, threadId } = body;

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

		await this.openAi.addMessageToThread(threadId, chatMessage);

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

		return await this.openAi.addMessageToThread(threadId, prompt);
	}

	public async changeTaskSuggestion(
		user: UserDto,
		body: ChangeTaskSuggestionRequestDto,
	): Promise<null | TaskSuggestionsResponseDto> {
		const { task, threadId } = body;

		const runThreadOptions = runChangeTaskByCategoryOptions(task);
		const taskDeadLine = this.taskService.calculateDeadline(
			user.userTaskDays as number[],
		);
		const result = await this.openAi.runThread(threadId, runThreadOptions);

		return generateChangeTaskSuggestionsResponse(result, taskDeadLine);
	}

	public async explainTaskSuggestion(
		body: AIAssistantRequestDto,
	): Promise<AIAssistantResponseDto | null> {
		const { lastMessageId, payload, threadId } = body;

		const task = payload as TaskCreateDto;

		const runThreadOptions = runExplainTaskOptions(task);

		const result = await this.openAi.runThread(threadId, runThreadOptions);

		return generateExplainTaskSuggestionsResponse(result, task, lastMessageId);
	}

	public async initNewChat(
		user: UserDto,
	): Promise<AIAssistantResponseDto | null> {
		const userQuestionsWithAnswers =
			await this.onboardingRepository.findUserAnswersWithQuestions(user.id);

		const userWheelBalanceScores = await this.categoryService.findUserScores(
			user.id,
		);

		const initPrompt = generateQuestionsAnswersPrompt(userQuestionsWithAnswers);
		const threadId = await this.openAi.createThread([initPrompt]);

		const runThreadOptions = runInitialThreadOptions(
			user.name,
			userWheelBalanceScores,
		);

		const result = await this.openAi.runThread(threadId, runThreadOptions);

		return generateScoresResponse(result);
	}

	public async suggestTasksForCategories(
		user: UserDto,
		body: AIAssistantRequestDto,
	): Promise<AIAssistantResponseDto | null> {
		const { lastMessageId, payload, threadId } = body;
		const categories = payload as SelectedCategory[];
		const runThreadOptions = runTaskByCategoryOptions(categories);

		const taskDeadLine = this.taskService.calculateDeadline(
			user.userTaskDays as number[],
		);

		const result = await this.openAi.runThread(threadId, runThreadOptions);

		return generateTaskSuggestionsResponse(result, taskDeadLine, lastMessageId);
	}
}

export { AiAssistantService };
