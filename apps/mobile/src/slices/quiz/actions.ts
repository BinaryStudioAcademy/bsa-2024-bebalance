import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import { type CategoryDto } from "~/packages/quiz/quiz";

import { name as sliceName } from "./quiz.slice";

const getQuizCategories = createAsyncThunk<
	CategoryDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-quiz-categories`, async (_, { extra }) => {
	const { quizApi } = extra;

	const { items } = await quizApi.getQuizCategories();

	return items;
});

export { getQuizCategories };
