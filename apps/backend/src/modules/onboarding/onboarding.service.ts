import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { OnboardingError } from "./libs/exceptions/exceptions.js";
import {
	type OnboardingAnswerRequestDto,
	type OnboardingAnswerResponseDto,
} from "./libs/types/types.js";
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
	}: OnboardingAnswerRequestDto): Promise<OnboardingAnswerResponseDto> {
		const answers = await this.findAnswersByIds(answerIds);

		if (answers.length !== answerIds.length) {
			throw new OnboardingError({
				message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const addedAnswers = await this.onboardingRepository.createUserAnswers(
			userId,
			answerIds,
		);

		return { addedAnswers: addedAnswers.map((answer) => answer.toObject()) };
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

	public async findAnswersByIds(
		ids: number[],
	): Promise<OnboardingAnswerEntity[]> {
		return await this.onboardingRepository.findAnswersByIds(ids);
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}
export { OnboardingService };
