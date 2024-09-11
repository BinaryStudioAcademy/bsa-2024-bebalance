import {
	Button,
	Checkbox,
	LoaderWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, DataStatus } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useFormController,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { categoriesSelectedValidationSchema } from "~/packages/categories/categories";
import { actions as categoriesActions } from "~/slices/quiz/quiz";

import {
	CATEGORIES_FIELD_NAME,
	CATEGORIES_FORM_DEFAULT_VALUES,
	CHECK_ALL_CATEGORIES_NAME,
	EMPTY_ARRAY_LENGTH,
} from "./libs/constants/constants";
import {
	getAllCategoryIds,
	getCategoriesSortedByScore,
	getSelectedCategoryIds,
} from "./libs/helpers/helpers";
import { type SelectedCategoryIds } from "./libs/types/types";

type Properties = {
	onSubmit?: (payload: { categoryIds: SelectedCategoryIds }) => void;
	submitButtonName: string;
};

const CheckboxCategoriesForm: React.FC<Properties> = ({
	submitButtonName,
}: Properties): JSX.Element => {
	const [submittedCategoryIds, setSubmittedCategoryIds] =
		useState<SelectedCategoryIds>(CATEGORIES_FORM_DEFAULT_VALUES);

	const dispatch = useAppDispatch();
	const { categories, dataStatus } = useAppSelector((state) => state.quiz);

	const { control, errors, handleSubmit, reset, setValue } = useAppForm<{
		[CATEGORIES_FIELD_NAME]: SelectedCategoryIds;
	}>({
		defaultValues: {
			[CATEGORIES_FIELD_NAME]: CATEGORIES_FORM_DEFAULT_VALUES,
		},
		validationSchema: categoriesSelectedValidationSchema,
	});

	const { field } = useFormController({ control, name: CATEGORIES_FIELD_NAME });
	const { value } = field;

	const isFormLoading = dataStatus === DataStatus.PENDING;
	const isAllChecked = value.length === categories.length;
	const areCategoriesExist = categories.length > EMPTY_ARRAY_LENGTH;

	useEffect(() => {
		void dispatch(categoriesActions.getScores());
	}, [dispatch]);

	useEffect(() => {
		reset({
			categoryIds: getSelectedCategoryIds(
				getCategoriesSortedByScore(categories),
			),
		});
	}, [reset, categories]);

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(
			(selectedCategoriesSubmissionData: {
				categoryIds: SelectedCategoryIds;
			}) => {
				setSubmittedCategoryIds(selectedCategoriesSubmissionData.categoryIds);
				// TODO: send selectedCategoriesSubmissionData to backend
			},
		)();
	}, [handleSubmit]);

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

	return (
		<LoaderWrapper isLoading={isFormLoading}>
			{areCategoriesExist && (
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
					<View style={globalStyles.alignItemsCenter}>
						<Text color={BaseColor.BLACK}>
							{submittedCategoryIds.join(", ")}
						</Text>
					</View>
				</View>
			)}
		</LoaderWrapper>
	);
};

export { CheckboxCategoriesForm };
