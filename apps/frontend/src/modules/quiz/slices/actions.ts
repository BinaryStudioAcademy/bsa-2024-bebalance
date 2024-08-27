import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type QuizQuestionsDto } from "~/modules/quiz/quiz.js";

import { name as sliceName } from "./quiz.slice.js";

const getQuestions = createAsyncThunk<
	QuizQuestionsDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-questions`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getQuestions();
});

export { getQuestions };
