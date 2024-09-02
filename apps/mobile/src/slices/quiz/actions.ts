import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import { type QuizCategoryDto } from "~/packages/quiz/quiz";

import { name as sliceName } from "./quiz.slice";

const getQuizCategories = createAsyncThunk<
	QuizCategoryDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-quiz-categories`, async (_, { extra }) => {
	const { quizApi } = extra;

	const { items } = await quizApi.getQuizCategories();

	return items;
});

export { getQuizCategories };
