import React from "react";

import {
	CategoriesForm,
	LoaderWrapper,
	ScreenWrapper,
} from "~/libs/components/components";
import { DataStatus, NumberValue } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks";
import { actions as categoriesActions } from "~/slices/categories/categories";

const Chat: React.FC = () => {
	const dispatch = useAppDispatch();
	const { categories, dataStatus } = useAppSelector(
		(state) => state.categories,
	);

	useEffect(() => {
		if (categories.length === NumberValue.ZERO) {
			void dispatch(categoriesActions.getQuizCategories());
		}
	}, [dispatch, categories]);

	const handleFormSubmit = useCallback((): void => {
		// TODO: Save to DB
	}, []);

	return (
		<ScreenWrapper>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				{categories.length > NumberValue.ZERO && (
					<CategoriesForm categories={categories} onSubmit={handleFormSubmit} />
				)}
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Chat };
