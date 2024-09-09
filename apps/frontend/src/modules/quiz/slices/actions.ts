import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type QuizQuestionDto,
	type QuizScoresGetAllResponseDto,
	type QuizUserAnswerDto,
	type UserAnswersRequestDto,
} from "~/modules/quiz/quiz.js";

import { name as sliceName } from "./quiz.slice.js";

const getAllQuestions = createAsyncThunk<
	{ items: QuizQuestionDto[][] },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-questions`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getAllQuestions();
});

const createUserAnswers = createAsyncThunk<
	QuizUserAnswerDto[],
	UserAnswersRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create-user`, async (createAnswerPayload, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.createUserAnswers(createAnswerPayload);
});

const getScores = createAsyncThunk<
	QuizScoresGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/score`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getScores();
});

export { createUserAnswers, getAllQuestions, getScores };
