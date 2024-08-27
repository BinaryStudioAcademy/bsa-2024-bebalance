import { type Service } from "~/libs/types/types.js";

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
	}: {
		answerIds: number[];
		userId: number;
	}): Promise<{
		savedAnswersCount: number;
	}> {
		// console.log("answerIds SERVICE", answerIds);
		// console.log("userId SERVICE", userId);

		// const answers = await Promise.all(answerIds.map((id) => this.find(id)));
		// const existingAnswers = answers.filter((answer) => answer !== null);
		// console.log("answers SERVICE ", answers);
		// console.log("existingAnswers SERVICE ", existingAnswers);

		// if (existingAnswers.length !== answerIds.length) {
		// 	throw new QuizError({
		// 		message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND,
		// 		status: HTTPCode.NOT_FOUND,
		// 	});
		// }

		// const answerEntities = existingAnswers.map((answer) => answer.toObject());
		// const answerEntities = existingAnswers
		// 	.filter((answer): answer is OnboardingAnswerEntity => answer !== null)
		// 	.map((answer) => answer.toObject());

		// const questionIds = answerEntities.map((answer) => answer.questionId);
		// const uniqueQuestionIds = new Set(questionIds);

		// if (uniqueQuestionIds.size !== questionIds.length) {
		// 			throw new QuizError({
		// 				message: ErrorMessage.DUPLICATE_ANSWER,
		// 				status: HTTPCode.BAD_REQUEST,
		// 			});
		// 		}

		const savedAnswersCount = await this.onboardingRepository.createUserAnswers(
			userId,
			answerIds,
		);

		// console.log("answerEntities SERVICE", answerEntities);

		return { savedAnswersCount };
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
