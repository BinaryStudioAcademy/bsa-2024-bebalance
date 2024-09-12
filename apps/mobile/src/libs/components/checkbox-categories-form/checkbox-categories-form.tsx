import {
	Button,
	MultipleCheckboxInput,
	View,
} from "~/libs/components/components";
import { NumericalValue } from "~/libs/enums/enums";
import { useAppForm, useCallback, useEffect } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type CategoriesSelectedRequestDto,
	type QuizScoresGetAllItemResponseDto,
} from "~/libs/types/types";
import { categoriesSelectedValidationSchema } from "~/packages/categories/categories";

import {
	CATEGORIES_FIELD_NAME,
	CATEGORIES_FORM_DEFAULT_VALUES,
	CHECK_ALL_CATEGORIES_NAME,
} from "./libs/constants/constants";
import {
	getCategoriesSortedByScore,
	getSelectedCategoryIds,
} from "./libs/helpers/helpers";

type Properties = {
	categories: QuizScoresGetAllItemResponseDto[];
	onSubmit: (payload: CategoriesSelectedRequestDto) => void;
	submitButtonName: string;
};

const CheckboxCategoriesForm: React.FC<Properties> = ({
	categories,
	onSubmit,
	submitButtonName,
}: Properties): JSX.Element | null => {
	const { control, errors, handleSubmit, reset } = useAppForm<{
		[CATEGORIES_FIELD_NAME]: number[];
	}>({
		defaultValues: {
			[CATEGORIES_FIELD_NAME]: CATEGORIES_FORM_DEFAULT_VALUES,
		},
		validationSchema: categoriesSelectedValidationSchema,
	});

	const checkboxGroupOptions = categories.map(({ categoryName, id }) => ({
		id,
		label: categoryName,
	}));

	useEffect(() => {
		reset({
			categoryIds: getSelectedCategoryIds(
				getCategoriesSortedByScore(categories),
			),
		});
	}, [reset, categories]);

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(onSubmit)();
	}, [handleSubmit, onSubmit]);

	if (categories.length === NumericalValue.ZERO) {
		return null;
	}

	return (
		<View style={[globalStyles.gap8, globalStyles.mb24]}>
			<MultipleCheckboxInput
				checkAllLabel={CHECK_ALL_CATEGORIES_NAME}
				control={control}
				errors={errors}
				fieldName={CATEGORIES_FIELD_NAME}
				options={checkboxGroupOptions}
			/>
			<Button label={submitButtonName} onPress={handleFormSubmit} />
		</View>
	);
};

export { CheckboxCategoriesForm };
