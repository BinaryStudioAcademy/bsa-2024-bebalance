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
import { toastMessage } from "~/libs/packages/toast-message/toast-message";
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

	const handleFormSubmit = useCallback(
		(selectedCategoriesIds: number[]): void => {
			const selectedLabels = categories
				.filter((category) => selectedCategoriesIds.includes(category.id))
				.map((category) => category.name)
				.join(", ");

			toastMessage.info({ message: `Selected Categories: ${selectedLabels}` });
		},
		[categories],
	);

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
