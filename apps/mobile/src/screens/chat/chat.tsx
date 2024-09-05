import React from "react";

import {
	CategoriesForm,
	LoaderWrapper,
	ScreenWrapper,
} from "~/libs/components/components";
import { DataStatus, NumberValue } from "~/libs/enums/enums";
import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { actions as quizActions } from "~/slices/quiz/quiz";

const Chat: React.FC = () => {
	const dispatch = useAppDispatch();
	const { categories, dataStatus } = useAppSelector((state) => state.quiz);

	useEffect(() => {
		if (categories.length === NumberValue.ZERO) {
			void dispatch(quizActions.getQuizCategories());
		}
	}, [dispatch, categories]);

	return (
		<ScreenWrapper>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				{categories.length > NumberValue.ZERO && (
					<CategoriesForm categories={categories} />
				)}
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Chat };
