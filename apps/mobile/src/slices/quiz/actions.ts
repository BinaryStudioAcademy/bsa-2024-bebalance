import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type QuizQuestionDto,
	type QuizScoresGetAllResponseDto,
} from "~/packages/quiz/quiz";

import { name as sliceName } from "./quiz.slice";

const getScores = createAsyncThunk<
	QuizScoresGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/score`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getScores();
});

const getAllQuestions = createAsyncThunk<
	{ items: QuizQuestionDto[][] },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-questions`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getAllQuestions();
});

export { getAllQuestions, getScores };
