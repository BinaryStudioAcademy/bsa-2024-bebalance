import { APIPath, ContentType } from "~/libs/enums/enums";
import { type APIConfiguration, BaseHttpApi } from "~/libs/packages/api/api";

import { QuizApiPath } from "./libs/enums/enums";
import {
	type QuizAnswersRequestDto,
	type QuizQuestionDto,
	type QuizScoresGetAllResponseDto,
	type QuizUserAnswerDto,
	type QuizScoresResponseDto,
	type QuizScoresUpdateRequestDto,
} from "./libs/types/types";

class QuizApi extends BaseHttpApi {
	public constructor({ baseUrl, http, storage }: APIConfiguration) {
		super({ baseUrl, http, path: APIPath.QUIZ, storage });
	}

	public async editScores(
		payload: QuizScoresUpdateRequestDto,
	): Promise<QuizScoresResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(QuizApiPath.SCORE, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<QuizScoresResponseDto>();
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
