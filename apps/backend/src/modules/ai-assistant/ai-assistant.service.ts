import { type OpenAI, OpenAIRoleKey } from "~/libs/modules/open-ai/open-ai.js";
import { type UserDto } from "~/libs/types/types.js";
import { type CategoryService } from "~/modules/categories/categories.js";
import { type OnboardingRepository } from "~/modules/onboarding/onboarding.js";
import { type TaskService } from "~/modules/tasks/tasks.js";

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
	type AIAssistantCreateMultipleTasksDto,
	type AIAssistantRequestDto,
	type AIAssistantResponseDto,
	type AIAssistantSuggestTaskRequestDto,
	type TaskCreateDto,
	type TaskDto,
	type ThreadMessageCreateDto,
} from "./libs/types/types.js";

type Constructor = {
	categoryService: CategoryService;
	onboardingRepository: OnboardingRepository;
	openAI: OpenAI;
	taskService: TaskService;
};

class AIAssistantService {
	private categoryService: CategoryService;
	private onboardingRepository: OnboardingRepository;
	private openAI: OpenAI;
	private taskService: TaskService;

	public constructor({
		categoryService,
		onboardingRepository,
		openAI,
		taskService,
	}: Constructor) {
		this.openAI = openAI;
		this.categoryService = categoryService;
		this.onboardingRepository = onboardingRepository;
		this.taskService = taskService;
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

	public async acceptTasks(
		user: UserDto,
		body: AIAssistantCreateMultipleTasksDto,
	): Promise<boolean[]> {
		const { payload, threadId } = body;
		const tasks = payload;

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
	): Promise<boolean> {
		const { text, threadId } = body;

		const prompt = {
			content: text,
			role: OpenAIRoleKey.USER,
		};

		return await this.openAI.addMessageToThread(threadId, prompt);
	}

	public async changeTasksSuggestion(
		user: UserDto,
		body: AIAssistantRequestDto,
	): Promise<AIAssistantResponseDto | null> {
		const { payload, threadId } = body;
		const tasks = payload as TaskCreateDto[];

		const runThreadOptions = runChangeTasksByCategoryOptions(tasks);

		const result = await this.openAI.runThread(threadId, runThreadOptions);

		return generateChangeTasksSuggestionsResponse(result);
	}

	public async explainTasksSuggestion(
		body: AIAssistantRequestDto,
	): Promise<AIAssistantResponseDto | null> {
		const { payload, threadId } = body;

		const tasks = payload as TaskCreateDto[];

		const runThreadOptions = runExplainTaskOptions(tasks);

		const result = await this.openAI.runThread(threadId, runThreadOptions);

		return generateExplainTasksSuggestionsResponse(result);
	}

	public async initializeNewChat(
		user: UserDto,
	): Promise<AIAssistantResponseDto | null> {
		const userQuestionsWithAnswers =
			await this.onboardingRepository.findUserAnswersWithQuestions(user.id);

		const userWheelBalanceScores = await this.categoryService.findUserScores(
			user.id,
		);

		const initPrompt = generateQuestionsAnswersPrompt(userQuestionsWithAnswers);
		const threadId = await this.openAI.createThread([initPrompt]);
		const userScoresPrompt = generateUserScoresPrompt(userWheelBalanceScores);
		await this.openAI.addMessageToThread(threadId, userScoresPrompt);

		return {
			messages: [],
			threadId,
		};
	}

	public async suggestTasksForCategories(
		body: AIAssistantSuggestTaskRequestDto,
	): Promise<AIAssistantResponseDto | null> {
		const { categories, threadId } = body;
		const runThreadOptions = runSuggestTaskByCategoryOptions(categories);

		const result = await this.openAI.runThread(threadId, runThreadOptions);

		return generateTasksSuggestionsResponse(result);
	}
}

export { AIAssistantService };
