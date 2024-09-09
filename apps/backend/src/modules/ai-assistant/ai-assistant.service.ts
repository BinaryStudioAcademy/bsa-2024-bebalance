import { type OpenAi, OpenAiRoleKey } from "~/libs/modules/open-ai/open-ai.js";
import { type UserDto } from "~/libs/types/types.js";
import { type CategoryService } from "~/modules/categories/categories.js";
import { type OnboardingRepository } from "~/modules/onboarding/onboarding.js";

import {
	generateInitPrompt,
	generateScoresResponse,
	generateUserScoresPrompt,
} from "./libs/helpers/helpers.js";
import {
	type BalanceWheelAnalysisResponseDto,
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

	public async initNewThread(
		user: UserDto,
	): Promise<BalanceWheelAnalysisResponseDto | null> {
		const userAnswersWithQuestions =
			await this.onboardingRepository.findUserAnswersWithQuestions(user.id);

		const userWheelBalanceScores = await this.categoryService.findUserScores(
			user.id,
		);

		const [initPrompt, userScoresPrompt] = [
			generateInitPrompt(userAnswersWithQuestions, user.name),
			generateUserScoresPrompt(userWheelBalanceScores),
		];

		const theadId = await this.openAi.createThread([initPrompt]);

		const result = await this.openAi.generateBalanceAnalysis(
			theadId,
			userScoresPrompt,
		);

		return generateScoresResponse(result);
	}
}

export { AiAssistantService };
