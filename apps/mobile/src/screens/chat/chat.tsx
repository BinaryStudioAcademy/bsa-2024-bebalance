import React from "react";

import {
	CategoriesForm,
	LoaderWrapper,
	ScreenWrapper,
} from "~/libs/components/components";
import { DataStatus } from "~/libs/enums/enums";
import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { actions as quizActions } from "~/slices/quiz/quiz";

const ZERO_CATEGORIES = 0;

const Chat: React.FC = () => {
	const dispatch = useAppDispatch();
	const { categories, dataStatus } = useAppSelector((state) => state.quiz);

	useEffect(() => {
		if (categories.length === ZERO_CATEGORIES) {
			void dispatch(quizActions.getQuizCategories());
		}
	}, [dispatch, categories]);

	return (
		<ScreenWrapper>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				<CategoriesForm categories={categories} />
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Chat };
