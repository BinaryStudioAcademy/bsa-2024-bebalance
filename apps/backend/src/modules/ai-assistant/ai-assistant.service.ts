import { type OpenAi, OpenAiRoleKey } from "~/libs/modules/open-ai/open-ai.js";
import { type UserDto } from "~/libs/types/types.js";
import { type CategoryService } from "~/modules/categories/categories.js";
import { type OnboardingRepository } from "~/modules/onboarding/onboarding.js";

import {
	generateQuestionsAnswersPrompt,
	generateScoresResponse,
	generateTaskSuggestionsResponse,
	runInitialThreadOptions,
	runTaskByCategoryOptions,
} from "./libs/helpers/helpers.js";
import {
	type BalanceWheelAnalysisResponseDto,
	type TaskSuggestionRequestDto,
	type TaskSuggestionsResponseDto,
	type ThreadMessageCreateDto,
} from "./libs/types/types.js";

type Constructor = {
	categoryService: CategoryService;
	onboardingRepository: OnboardingRepository;
	openAi: OpenAi;
};

class AiAssistantService {
	private categoryService: CategoryService;
	private onboardingRepository: OnboardingRepository;
	private openAi: OpenAi;

	public constructor({
		categoryService,
		onboardingRepository,
		openAi,
	}: Constructor) {
		this.openAi = openAi;
		this.categoryService = categoryService;
		this.onboardingRepository = onboardingRepository;
	}

	public async addMessageToThread(
		body: ThreadMessageCreateDto,
	): Promise<boolean> {
		const { text, threadId } = body;

		const prompt = {
			content: text,
			metadata: {},
			role: OpenAiRoleKey.USER,
		};

		return await this.openAi.addMessageToThread(threadId, prompt);
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
