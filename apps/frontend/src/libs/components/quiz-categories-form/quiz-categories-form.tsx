import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { type InputOption } from "~/libs/types/types.js";
import { actions as categoriesActions } from "~/modules/categories/categories.js";

import { Button, Checkbox, Loader } from "../components.js";
import { QUIZ_CATEGORIES_FORM_DEFAULT_VALUES as FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import { type QuizCategoriesFormFields as FormFields } from "./libs/types/types.js";

type Properties = {
	onSubmit?: (payload: Pick<FormFields, "categoriesIds">) => void;
};

const QuizCategoriesForm: React.FC<Properties> = ({
	onSubmit = (): void => {},
}: Properties) => {
	const { control, getValues, handleSubmit, setValue } = useAppForm<FormFields>(
		{ defaultValues: FORM_DEFAULT_VALUES },
	);

	const { isLoading, quizCategories } = useAppSelector(({ categories }) => {
		const { dataStatus, items } = categories;

		return {
			isLoading: dataStatus === DataStatus.PENDING,
			quizCategories: items,
		};
	});
	const categoryInputOptions: InputOption[] = quizCategories.map(
		(category) => ({
			label: category.name,
			value: category.id.toString(),
		}),
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(categoriesActions.getCategories());
	}, [dispatch]);

	const handleSelectAll = useCallback(() => {
		const { isSelectAll } = getValues();

		if (isSelectAll) {
			setValue("categoriesIds", []);
		} else {
			setValue(
				"categoriesIds",
				quizCategories.map((category) => category.id.toString()),
			);
		}
	}, [getValues, quizCategories, setValue]);

	const handleInputSelect = useCallback(() => {
		const { categoriesIds, isSelectAll } = getValues();

		const isAllChecked = ++categoriesIds.length === quizCategories.length;

		if (isAllChecked && !isSelectAll) {
			setValue("isSelectAll", true);
		} else if (!isAllChecked && isSelectAll) {
			setValue("isSelectAll", false);
		}
	}, [getValues, quizCategories.length, setValue]);

	const handleFormSubmit = useCallback(
		(event: React.BaseSyntheticEvent): void => {
			void handleSubmit(({ categoriesIds }) => {
				onSubmit({ categoriesIds });
			})(event);
		},
		[handleSubmit, onSubmit],
	);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<section>
			<form onSubmit={handleFormSubmit}>
				<Checkbox
					control={control}
					label="All"
					name="isSelectAll"
					onClick={handleSelectAll}
				/>
				<Checkbox
					control={control}
					label="Categories"
					name="categoriesIds"
					onClick={handleInputSelect}
					options={categoryInputOptions}
				/>
				<br />
				<Button label="Retake Quiz" type="submit" />
			</form>
		</section>
	);
};

export { QuizCategoriesForm };
