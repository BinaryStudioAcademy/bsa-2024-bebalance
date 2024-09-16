import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type QuizAnswersRequestDto,
	type QuizQuestionDto,
	type QuizScoresGetAllResponseDto,
	type QuizScoresResponseDto,
	type QuizScoresUpdateRequestDto,
	type QuizUserAnswerDto,
} from "~/modules/quiz/quiz.js";

import { name as sliceName } from "./quiz.slice.js";

const editScores = createAsyncThunk<
	QuizScoresResponseDto,
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

export { editScores, getAllQuestions, getScores, saveAnswers };
