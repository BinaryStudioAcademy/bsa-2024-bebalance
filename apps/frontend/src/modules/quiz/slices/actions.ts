import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type QuizScoresGetAllResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./quiz.slice.js";

const getScores = createAsyncThunk<
	QuizScoresGetAllResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/score`, async (_, { extra }) => {
	const { quizApi } = extra;

	return await quizApi.getScores();
});

export { getScores };
