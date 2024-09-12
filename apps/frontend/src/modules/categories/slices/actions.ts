import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type CategoryDto } from "../libs/types/types.js";
import { name as sliceName } from "./categories.slice.js";

const getCategories = createAsyncThunk<
	CategoryDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/fetch-quiz-categories`, async (_, { extra }) => {
	const { categoriesApi } = extra;

	const { items } = await categoriesApi.getCategories();

	return items;
});

export { getCategories };
