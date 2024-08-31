import { useEffect } from "react";

import { DataStatus } from "~/libs/enums/enums.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
	actions as quizCategoriesActions,
	type QuizCategoryDto,
} from "~/modules/quiz-categories/quiz-categories.js";

const useQuizCategories = (): {
	isLoading: boolean;
	quizCategories: QuizCategoryDto[];
} => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(quizCategoriesActions.fetchQuizCategories()).catch(() => {});
	}, [dispatch]);

	return useAppSelector(({ quizCategories }) => {
		const { dataStatus, items } = quizCategories;

		return {
			isLoading: dataStatus === DataStatus.PENDING,
			quizCategories: items,
		};
	});
};

export { useQuizCategories };
