import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type QuizCategoryDto } from "../libs/types/types.js";
import { name as sliceName } from "./quiz-categories.slice.js";

const fetchQuizCategories = createAsyncThunk<
	QuizCategoryDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/fetch-quiz-categories`, async (_, { extra }) => {
	const { quizApi } = extra;

	const { items } = await quizApi.getQuizCategories();

	return items;
});

export { fetchQuizCategories };
