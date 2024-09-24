import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type CategoriesGetRequestQueryDto,
	type QuizAnswersRequestDto,
	type QuizQuestionDto,
	type QuizScoresGetAllResponseDto,
	type QuizScoresUpdateRequestDto,
	type QuizScoresUpdateResponseDto,
	type QuizUserAnswerDto,
} from "~/modules/quiz/quiz.js";

import { name as sliceName } from "./quiz.slice.js";

const editScores = createAsyncThunk<
	QuizScoresUpdateResponseDto,
	QuizScoresUpdateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/edit-scores`, async (editScoresPayload, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.editScores(editScoresPayload);
});

const getAllQuestions = createAsyncThunk<
	{ items: QuizQuestionDto[][] },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-questions`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getAllQuestions();
});

const getQuestionsByCategoryIds = createAsyncThunk<
	{ items: QuizQuestionDto[][] },
	CategoriesGetRequestQueryDto,
	AsyncThunkConfig
>(`${sliceName}/get-questions-by-category-ids`, async (payload, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getQuestionsByCategoryIds(payload.categoryIds);
});

const saveAnswers = createAsyncThunk<
	QuizUserAnswerDto[],
	QuizAnswersRequestDto,
	AsyncThunkConfig
>(`${sliceName}/save-answers`, async (createAnswerPayload, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.saveAnswers(createAnswerPayload);
});

const getScores = createAsyncThunk<
	QuizScoresGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/score`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getScores();
});

export {
	editScores,
	getAllQuestions,
	getQuestionsByCategoryIds,
	getScores,
	saveAnswers,
};
