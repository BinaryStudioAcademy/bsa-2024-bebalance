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

	const handleSubmitCategories = useCallback(
		(selectedCategories: string[]): void => {
			const selectedLabels = selectedCategories.join(", ");
			toastMessage.info({ message: `Selected Categories: ${selectedLabels}` });
		},
		[],
	);

	return (
		<ScreenWrapper>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				{categories.length > NumberValue.ZERO && (
					<CategoriesForm
						categories={categories}
						onSubmit={handleSubmitCategories}
					/>
				)}
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { Chat };
