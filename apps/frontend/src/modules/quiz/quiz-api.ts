import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type APIConfiguration } from "~/libs/types/types.js";
import {
	type QuizAnswersRequestDto,
	type QuizQuestionDto,
	type QuizScoresGetAllResponseDto,
	type QuizScoresUpdateRequestDto,
	type QuizScoresUpdateResponseDto,
	type QuizUserAnswerDto,
} from "~/modules/quiz/quiz.js";

import { QuizApiPath } from "./libs/enums/enums.js";

class QuizApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: APIConfiguration) {
		super({ baseUrl, http, path: APIPath.QUIZ, storage });
	}

	public async editScores(
		payload: QuizScoresUpdateRequestDto,
	): Promise<QuizScoresUpdateResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(QuizApiPath.SCORE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<QuizScoresUpdateResponseDto>();
	}

	public async getAllQuestions(): Promise<{ items: QuizQuestionDto[][] }> {
		const response = await this.load(
			this.getFullEndpoint(QuizApiPath.QUESTIONS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<{ items: QuizQuestionDto[][] }>();
	}

	public async getQuestionsByCategoryIds({
		categoryIds,
	}: {
		categoryIds: number[];
	}): Promise<{
		items: QuizQuestionDto[][];
	}> {
		const response = await this.load(
			this.getFullEndpoint(
				`${QuizApiPath.QUESTIONS}?categoryIds=${JSON.stringify(categoryIds)}`,
				{},
			),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<{ items: QuizQuestionDto[][] }>();
	}

	public async getScores(): Promise<QuizScoresGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(QuizApiPath.SCORE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<QuizScoresGetAllResponseDto>();
	}

	public async saveAnswers(
		payload: QuizAnswersRequestDto,
	): Promise<QuizUserAnswerDto[]> {
		const response = await this.load(
			this.getFullEndpoint(QuizApiPath.ANSWER, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<QuizUserAnswerDto[]>();
	}
}

export { QuizApi };
