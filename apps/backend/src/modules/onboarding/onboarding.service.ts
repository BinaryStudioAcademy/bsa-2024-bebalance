import { ErrorMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { OnboardingError } from "./libs/exceptions/exceptions.js";
import {
	type OnboardingAnswerDto,
	type OnboardingAnswerRequestDto,
	type OnboardingAnswerResponseDto,
	type OnboardingGetAllResponseDto,
	type OnboardingQuestionRequestDto,
	type OnboardingQuestionResponseDto,
} from "./libs/types/types.js";
import { type OnboardingRepository } from "./onboarding.repository.js";
import { type OnboardingAnswerEntity } from "./onboarding-answer.entity.js";
import { OnboardingQuestionEntity } from "./onboarding-question.entity.js";

class OnboardingService implements Service {
	private onboardingRepository: OnboardingRepository;

	public constructor(onboardingRepository: OnboardingRepository) {
		this.onboardingRepository = onboardingRepository;
	}

	public async create(
		payload: OnboardingQuestionRequestDto,
	): Promise<OnboardingQuestionResponseDto> {
		const { answers, label } = payload;

		const newQuestionEntity = OnboardingQuestionEntity.initializeNew({
			answers: answers.map((answer) => {
				return {
					label: answer.label,
				};
			}),
			label,
		});

		const savedQuestionEntity =
			await this.onboardingRepository.create(newQuestionEntity);

		return savedQuestionEntity.toObject();
	}

	public async createAnswer({
		answerIds,
		userId,
	}: OnboardingAnswerRequestDto): Promise<OnboardingAnswerResponseDto> {
		const answers = await this.findAnswersByIds(answerIds);

		const questionAnswered = new Set<number>();

		for (const answer of answers) {
			const { questionId } = answer.toObject();

			if (questionAnswered.has(questionId)) {
				throw new OnboardingError({
					message: ErrorMessage.DUPLICATE_QUESTION_ANSWER,
					status: HTTPCode.BAD_REQUEST,
				});
			}

			questionAnswered.add(questionId);
		}

		if (answers.length !== answerIds.length) {
			throw new OnboardingError({
				message: ErrorMessage.REQUESTED_ENTITY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const totalQuestions = await this.onboardingRepository.countQuestions();

		if (answerIds.length !== totalQuestions) {
			throw new OnboardingError({
				message: ErrorMessage.INSUFFICIENT_ANSWERS,
				status: HTTPCode.BAD_REQUEST,
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

	public async delete(id: number): Promise<boolean> {
		return await this.onboardingRepository.delete(id);
	}

	public deleteAnswer(id: number): Promise<boolean> {
		return this.onboardingRepository.deleteUsersAnswers(id);
	}

	public async find(id: number): Promise<null | OnboardingQuestionResponseDto> {
		const onboardingQuestion = await this.onboardingRepository.find(id);

		return onboardingQuestion ? onboardingQuestion.toObject() : null;
	}

	public async findAll(): Promise<OnboardingGetAllResponseDto> {
		const items: OnboardingQuestionEntity[] =
			await this.onboardingRepository.findAll();

		return {
			items: items.map((item) => {
				return item.toObject();
			}),
		};
	}

	public async findAllAnswers(): Promise<{ items: OnboardingAnswerDto[] }> {
		const answers = await this.onboardingRepository.findAllAnswers();

		return {
			items: answers.map((answer) => {
				return answer.toObject();
			}),
		};
	}
	public async findAnswer(id: number): Promise<null | OnboardingAnswerDto> {
		const answer = await this.onboardingRepository.findAnswerById(id);

		return answer ? answer.toObject() : null;
	}

	public async findAnswersByIds(
		ids: number[],
	): Promise<OnboardingAnswerEntity[]> {
		return await this.onboardingRepository.findAnswersByIds(ids);
	}

	public async update(
		id: number,
		payload: OnboardingQuestionResponseDto,
	): Promise<OnboardingQuestionRequestDto> {
		const { answers, label } = payload;

		const question = OnboardingQuestionEntity.initializeNew({
			answers: answers.map((answer) => {
				return {
					label: answer.label,
				};
			}),
			label,
		});

		const updatedQuestion = await this.onboardingRepository.update(
			id,
			question,
		);

		return updatedQuestion.toObject();
	}

	public async updateAnswer(
		id: number,
		payload: Partial<OnboardingAnswerDto>,
	): Promise<OnboardingAnswerDto> {
		const answer = await this.onboardingRepository.updateAnswer(id, payload);

		return answer.toObject();
	}
}

export { OnboardingService };
