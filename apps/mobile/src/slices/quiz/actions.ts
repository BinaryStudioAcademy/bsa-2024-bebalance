import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types";
import { type QuizQuestionDto } from "~/packages/quiz/quiz";

import { name as sliceName } from "./quiz.slice";

const getAllQuestions = createAsyncThunk<
	{ items: QuizQuestionDto[][] },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/questions`, async (_, { extra }) => {
	const { quizApi } = extra;

	try {
		const result = await quizApi.getAllQuestions();
		console.log("Result from quizApi.getAllQuestions:", result); // Log the API result here

		return result;
	} catch (error) {
		console.error("Error fetching questions:", error); // Log any errors here
		throw error; // Rethrow the error so it is caught by the rejected state
	}

	return await quizApi.getAllQuestions();
});

export { getAllQuestions };
