import { type OpenAi, OpenAiRoleKey } from "~/libs/modules/open-ai/open-ai.js";
import { type UserDto } from "~/libs/types/types.js";
import { type CategoryService } from "~/modules/categories/categories.js";
import { type OnboardingRepository } from "~/modules/onboarding/onboarding.js";
import { TaskEntity, type TaskRepository } from "~/modules/tasks/tasks.js";

import {
	generateChangeTaskSuggestionsResponse,
	generateQuestionsAnswersPrompt,
	generateScoresResponse,
	generateTaskSuggestionsResponse,
	runChangeTaskByCategoryOptions,
	runInitialThreadOptions,
	runTaskByCategoryOptions,
} from "./libs/helpers/helpers.js";
import {
	type BalanceWheelAnalysisResponseDto,
	type ChangeTaskSuggestionRequestDto,
	type TaskDto,
	type TaskSuggestionRequestDto,
	type TaskSuggestionsResponseDto,
	type ThreadMessageCreateDto,
} from "./libs/types/types.js";

type Constructor = {
	categoryService: CategoryService;
	onboardingRepository: OnboardingRepository;
	openAi: OpenAi;
	taskRepository: TaskRepository;
};

class AiAssistantService {
	private categoryService: CategoryService;
	private onboardingRepository: OnboardingRepository;
	private openAi: OpenAi;
	private taskRepository: TaskRepository;

	public constructor({
		categoryService,
		onboardingRepository,
		openAi,
		taskRepository,
	}: Constructor) {
		this.openAi = openAi;
		this.categoryService = categoryService;
		this.onboardingRepository = onboardingRepository;
		this.taskRepository = taskRepository;
	}

	public async acceptTask(
		user: UserDto,
		body: ChangeTaskSuggestionRequestDto,
	): Promise<TaskDto> {
		const { task, threadId } = body;

		const newTask = await this.taskRepository.create(
			TaskEntity.initializeNew({
				categoryId: task.categoryId,
				description: task.description,
				dueDate: task.dueDate,
				label: task.label,
				userId: user.id,
			}),
		);
		const chatMessage = {
			content: `User has accepted this task: ${JSON.stringify(newTask)}`,
			role: OpenAiRoleKey.USER,
		};

		await this.openAi.addMessageToThread(threadId, chatMessage);

		return newTask.toObject();
	}

	public async addMessageToThread(
		body: ThreadMessageCreateDto,
	): Promise<boolean> {
		const { text, threadId } = body;

		const prompt = {
			content: text,
			role: OpenAiRoleKey.USER,
		};

		return await this.openAi.addMessageToThread(threadId, prompt);
	}

	public async changeTaskSuggestion(
		body: ChangeTaskSuggestionRequestDto,
	): Promise<null | TaskSuggestionsResponseDto> {
		const { task, threadId } = body;

		const runThreadOptions = runChangeTaskByCategoryOptions(task);

		const result = await this.openAi.runThread(threadId, runThreadOptions);

		return generateChangeTaskSuggestionsResponse(result);
	}

	public async initNewChat(
		user: UserDto,
	): Promise<BalanceWheelAnalysisResponseDto | null> {
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
		body: TaskSuggestionRequestDto,
	): Promise<null | TaskSuggestionsResponseDto> {
		const { categories, threadId } = body;

		const runThreadOptions = runTaskByCategoryOptions(categories);

		const result = await this.openAi.runThread(threadId, runThreadOptions);

		return generateTaskSuggestionsResponse(result);
	}
}

export { AiAssistantService };
