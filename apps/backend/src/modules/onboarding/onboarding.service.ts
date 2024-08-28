import { type Service } from "~/libs/types/types.js";

import {
	type OnboardingGetAllResponseDto,
	type OnboardingQuestionDto,
	type OnboardingQuestionRequestDto,
} from "./libs/types/types.js";
import { type OnboardingRepository } from "./onboarding.repository.js";
import { OnboardingQuestionEntity } from "./onboarding-question.entity.js";

class OnboardingService implements Service {
	private onboardingRepository: OnboardingRepository;

	public constructor(onboardingRepository: OnboardingRepository) {
		this.onboardingRepository = onboardingRepository;
	}

	public async create(
		payload: OnboardingQuestionRequestDto,
	): Promise<OnboardingQuestionDto> {
		const { answers, label } = payload;

		const newQuestionEntity = OnboardingQuestionEntity.initializeNew({
			answers: answers.map((answer) => ({
				label: answer.label,
			})),
			label,
		});

		const savedQuestionEntity =
			await this.onboardingRepository.create(newQuestionEntity);

		return savedQuestionEntity.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.onboardingRepository.delete(id);
	}

	public async find(id: number): Promise<null | OnboardingQuestionDto> {
		const onboardingQuestion = await this.onboardingRepository.find(id);

		return onboardingQuestion ? onboardingQuestion.toObject() : null;
	}

	public async findAll(): Promise<OnboardingGetAllResponseDto> {
		const items: OnboardingQuestionEntity[] =
			await this.onboardingRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async update(
		id: number,
		payload: OnboardingQuestionDto,
	): Promise<OnboardingQuestionRequestDto> {
		const { answers, label } = payload;

		const questionEntity = OnboardingQuestionEntity.initializeNew({
			answers: answers.map((answer) => ({
				label: answer.label,
			})),
			label,
		});

		const updatedQuestionEntity = await this.onboardingRepository.update(
			id,
			questionEntity,
		);

		return updatedQuestionEntity.toObject();
	}
}

export { OnboardingService };
