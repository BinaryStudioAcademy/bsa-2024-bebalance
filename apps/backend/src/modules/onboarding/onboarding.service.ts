import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { QuizError } from "./libs/exceptions/exceptions.js";
import { type OnboardingAnswerRequestDto } from "./libs/types/types.js";
import { type OnboardingRepository } from "./onboarding.repository.js";
import { type OnboardingAnswerEntity } from "./onboarding-answer.entity.js";

class OnboardingService implements Service {
	private onboardingRepository: OnboardingRepository;

	public constructor(onboardingRepository: OnboardingRepository) {
		this.onboardingRepository = onboardingRepository;
	}

	public async create({
		answerIds,
		userId,
	}: OnboardingAnswerRequestDto): Promise<{
		addedAnswers: OnboardingAnswerEntity[];
	}> {
		const answers = await Promise.all(answerIds.map((id) => this.find(id)));
		const existingAnswers = answers.filter((answer) => answer !== null);

		if (existingAnswers.length !== answerIds.length) {
			throw new QuizError({
				message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const addedAnswers = await this.onboardingRepository.createUserAnswers(
			userId,
			answerIds,
		);

		return { addedAnswers };
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<null | OnboardingAnswerEntity> {
		return await this.onboardingRepository.find(id);
	}

	public async findAll(): Promise<{ items: OnboardingAnswerEntity[] }> {
		const items = await this.onboardingRepository.findAll();

		return { items };
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}
export { OnboardingService };
