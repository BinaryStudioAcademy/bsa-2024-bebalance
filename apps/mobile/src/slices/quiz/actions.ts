import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import { type QuizQuestionDto } from "~/packages/quiz/quiz";

import { name as sliceName } from "./quiz.slice";

const getAllQuestions = createAsyncThunk<
	{ items: QuizQuestionDto[][] },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-questions`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getAllQuestions();
});

export { getAllQuestions };
