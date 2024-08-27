import { type Service } from "~/libs/types/types.js";

import { type OnboardingGetAllResponseDto } from "./libs/types/types.js";
import { type OnboardingRepository } from "./onboarding.repository.js";
import { type OnboardingQuestionEntity } from "./onboarding-question.entity.js";

class OnboardingService implements Service {
	private onboardingRepository: OnboardingRepository;

	public constructor(onboardingRepository: OnboardingRepository) {
		this.onboardingRepository = onboardingRepository;
	}

	public create(): ReturnType<Service["create"]> {
		return Promise.resolve(null);
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(true);
	}

	public async findAll(): Promise<OnboardingGetAllResponseDto> {
		const items: OnboardingQuestionEntity[] =
			await this.onboardingRepository.getOnboardingSurvey();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { OnboardingService };
