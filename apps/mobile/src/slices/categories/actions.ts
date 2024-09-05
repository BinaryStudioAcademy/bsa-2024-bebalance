import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import { type CategoryDto } from "~/packages/categories/categories";

import { name as sliceName } from "./categories.slice";

const getCategories = createAsyncThunk<
	CategoryDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-quiz-categories`, async (_, { extra }) => {
	const { categoriesApi } = extra;

	const { items } = await categoriesApi.getCategories();

	return items;
});

export { getCategories };
