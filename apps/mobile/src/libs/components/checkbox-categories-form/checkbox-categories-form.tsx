import { Button, Checkbox, Text, View } from "~/libs/components/components";
import { BaseColor, NumericalValue } from "~/libs/enums/enums";
import {
	useAppForm,
	useCallback,
	useEffect,
	useFormController,
} from "~/libs/hooks/hooks";
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
	getAllCategoryIds,
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
	const { control, errors, handleSubmit, reset, setValue } = useAppForm<{
		[CATEGORIES_FIELD_NAME]: number[];
	}>({
		defaultValues: {
			[CATEGORIES_FIELD_NAME]: CATEGORIES_FORM_DEFAULT_VALUES,
		},
		validationSchema: categoriesSelectedValidationSchema,
	});

	useEffect(() => {
		reset({
			categoryIds: getSelectedCategoryIds(
				getCategoriesSortedByScore(categories),
			),
		});
	}, [reset, categories]);

	const { field } = useFormController({ control, name: CATEGORIES_FIELD_NAME });
	const { value } = field;

	const isAllChecked = value.length === categories.length;

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(onSubmit)();
	}, [handleSubmit, onSubmit]);

	const handleAllValueChange = useCallback((): void => {
		const nextCategoryIds = getAllCategoryIds(categories);

		if (isAllChecked) {
			setValue(CATEGORIES_FIELD_NAME, CATEGORIES_FORM_DEFAULT_VALUES);
		} else {
			setValue(CATEGORIES_FIELD_NAME, nextCategoryIds);
		}
	}, [isAllChecked, setValue, categories]);

	const handleCategoryValueChange = useCallback(
		({ id, isChecked }: { id: number; isChecked: boolean }) =>
			(): void => {
				const previousCategoryIds = value;

				if (isChecked) {
					setValue(
						CATEGORIES_FIELD_NAME,
						previousCategoryIds.filter((categoryId) => categoryId !== id),
					);
				} else {
					setValue(CATEGORIES_FIELD_NAME, [...previousCategoryIds, id]);
				}
			},
		[setValue, value],
	);

	if (categories.length === NumericalValue.ZERO) {
		return null;
	}

	return (
		<View style={[globalStyles.gap8, globalStyles.mb24]}>
			<Checkbox
				isChecked={isAllChecked}
				label={CHECK_ALL_CATEGORIES_NAME}
				onValueChange={handleAllValueChange}
			/>
			{categories.map(({ categoryName, id }) => {
				const isChecked = value.includes(id);

				return (
					<Checkbox
						isChecked={isChecked}
						key={id}
						label={categoryName}
						onValueChange={handleCategoryValueChange({ id, isChecked })}
					/>
				);
			})}
			<View style={globalStyles.alignItemsCenter}>
				<Text color={BaseColor.RED}>
					{errors[CATEGORIES_FIELD_NAME]?.message}
				</Text>
			</View>
			<Button label={submitButtonName} onPress={handleFormSubmit} />
		</View>
	);
};

export { CheckboxCategoriesForm };
