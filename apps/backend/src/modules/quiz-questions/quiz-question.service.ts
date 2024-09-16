import { type Service } from "~/libs/types/types.js";

import {
	type QuizAnswerDto,
	type QuizAnswerEntity,
} from "../quiz-answers/quiz-answers.js";
import {
	type CategoriesGetRequestQueryDto,
	type QuizQuestionDto,
	type QuizQuestionRequestDto,
} from "./libs/types/types.js";
import { QuizQuestionEntity } from "./quiz-question.entity.js";
import { type QuizQuestionRepository } from "./quiz-question.repository.js";

class QuizQuestionService implements Service {
	private quizQuestionRepository: QuizQuestionRepository;

	public constructor(quizQuestionRepository: QuizQuestionRepository) {
		this.quizQuestionRepository = quizQuestionRepository;
	}

	public convertQuestionEntityToDto(
		questionEntity: QuizQuestionEntity,
	): QuizQuestionDto {
		const question = questionEntity.toObject();
		const answers: QuizAnswerDto[] = question.answers.map(
			(answerEntity: QuizAnswerEntity) => {
				const answer = answerEntity.toObject();

				return {
					...answer,
					userAnswers: [],
				};
			},
		);

		return {
			...question,
			answers,
		};
	}

	public async countAll(): Promise<number> {
		return await this.quizQuestionRepository.countAll();
	}

	public async countByCategoryIds(categoryIds: number[]): Promise<number> {
		return await this.quizQuestionRepository.countByCategoryIds(categoryIds);
	}

	public async create(
		payload: QuizQuestionRequestDto,
	): Promise<QuizQuestionDto> {
		const questionEntity = await this.quizQuestionRepository.create(
			QuizQuestionEntity.initializeNew(payload),
		);

		return this.convertQuestionEntityToDto(questionEntity);
	}

	public delete(id: number): Promise<boolean> {
		return this.quizQuestionRepository.delete(id);
	}

	public async find(id: number): Promise<null | QuizQuestionDto> {
		const questionEntity = await this.quizQuestionRepository.find(id);

		return questionEntity
			? this.convertQuestionEntityToDto(questionEntity)
			: null;
	}

	public async findAll(): Promise<{ items: QuizQuestionDto[][] }> {
		const questions = await this.quizQuestionRepository.findAll();

		const items = questions.map((questionEntity) => {
			return this.convertQuestionEntityToDto(questionEntity);
		});

		const groupedByCategory: Record<number, QuizQuestionDto[]> = {};

		for (const question of items) {
			const { categoryId } = question;

			if (!groupedByCategory[categoryId]) {
				groupedByCategory[categoryId] = [];
			}

			groupedByCategory[categoryId].push(question);
		}

		const result = Object.values(groupedByCategory);

		return { items: result };
	}

	public async findQuestions(
		query: CategoriesGetRequestQueryDto,
	): Promise<{ items: QuizQuestionDto[][] }> {
		if (!query.categoryIds) {
			return await this.findAll();
		}

		const questions = await this.quizQuestionRepository.findByIds(
			JSON.parse(query.categoryIds) as number[],
		);

		const items = questions.map((questionEntity) => {
			return this.convertQuestionEntityToDto(questionEntity);
		});

		const groupedByCategory: Record<number, QuizQuestionDto[]> = {};

		for (const question of items) {
			const { categoryId } = question;

			if (!groupedByCategory[categoryId]) {
				groupedByCategory[categoryId] = [];
			}

			groupedByCategory[categoryId].push(question);
		}

		const result = Object.values(groupedByCategory);

		return { items: result };
	}

	public async update(
		id: number,
		payload: Partial<QuizQuestionRequestDto>,
	): Promise<QuizQuestionDto> {
		const questionEntity = await this.quizQuestionRepository.update(
			id,
			payload,
		);

		return this.convertQuestionEntityToDto(questionEntity);
	}
}

export { QuizQuestionService };
