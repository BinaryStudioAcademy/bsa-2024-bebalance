import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { OnboardingError } from "./libs/exceptions/exceptions.js";
import {
	type OnboardingAnswerDto,
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

		return {
			answers: addedAnswers.map((answer) => {
				return answer.toObject();
			}),
		};
	}

	public delete(id: number): Promise<boolean> {
		return this.onboardingRepository.delete(id);
	}

	public async find(id: number): Promise<null | OnboardingAnswerDto> {
		const answer = await this.onboardingRepository.find(id);

		return answer ? answer.toObject() : null;
	}

	public async findAll(): Promise<{ items: OnboardingAnswerDto[] }> {
		const answers = await this.onboardingRepository.findAll();

		return {
			items: answers.map((answer) => {
				return answer.toObject();
			}),
		};
	}

	public async findAnswersByIds(
		ids: number[],
	): Promise<OnboardingAnswerEntity[]> {
		return await this.onboardingRepository.findAnswersByIds(ids);
	}

	public async update(
		id: number,
		payload: Partial<OnboardingAnswerDto>,
	): Promise<OnboardingAnswerDto> {
		const answer = await this.onboardingRepository.update(id, payload);

		return answer.toObject();
	}
}
export { OnboardingService };
