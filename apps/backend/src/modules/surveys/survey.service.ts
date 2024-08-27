import { type Service } from "~/libs/types/types.js";

import { type SurveyResponseDto } from "./libs/types/types.js";
import { type SurveyRepository } from "./survey.repository.js";

class SurveyService implements Service {
	private surveyRepository: SurveyRepository;

	public constructor(surveyRepository: SurveyRepository) {
		this.surveyRepository = surveyRepository;
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

	public findAll(): ReturnType<Service["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public async getOnboardingSurvey(): Promise<SurveyResponseDto[]> {
		const onboardingQuestions =
			await this.surveyRepository.getOnboardingSurvey();

		return onboardingQuestions.map((question) => question.toObject());
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { SurveyService };
