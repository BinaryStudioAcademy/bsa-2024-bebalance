import React from "react";

import {
	CategoriesForm,
	LoaderWrapper,
	ScreenWrapper,
} from "~/libs/components/components";
import { DataStatus, NumericValues } from "~/libs/enums/enums";
import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { actions as quizActions } from "~/slices/quiz/quiz";

const Chat: React.FC = () => {
	const dispatch = useAppDispatch();
	const { categories, dataStatus } = useAppSelector((state) => state.quiz);

	useEffect(() => {
		if (categories.length === NumericValues.ZERO) {
			void dispatch(quizActions.getQuizCategories());
		}
	}, [dispatch, categories]);

	return (
		<ScreenWrapper>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				{categories.length > NumericValues.ZERO && (
					<CategoriesForm categories={categories} />
				)}
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Chat };
