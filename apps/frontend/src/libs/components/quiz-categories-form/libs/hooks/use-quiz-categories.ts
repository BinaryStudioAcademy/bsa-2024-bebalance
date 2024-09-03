import { useEffect } from "react";

import { DataStatus } from "~/libs/enums/enums.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
	actions as categoriesActions,
	type CategoryDto,
} from "~/modules/categories/categories.js";

const useQuizCategories = (): {
	isLoading: boolean;
	quizCategories: CategoryDto[];
} => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(categoriesActions.getCategories());
	}, [dispatch]);

	return useAppSelector(({ categories }) => {
		const { dataStatus, items } = categories;

		return {
			isLoading: dataStatus === DataStatus.PENDING,
			quizCategories: items,
		};
	});
};

export { useQuizCategories };
