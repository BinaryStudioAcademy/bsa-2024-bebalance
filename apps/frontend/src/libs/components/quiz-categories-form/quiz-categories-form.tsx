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
import { QUIZ_CATEGORIES_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import { type QuizCategoriesFormFields } from "./libs/types/types.js";

type Properties = {
	onSubmit?: (payload: { categoryIds: number[] }) => void;
};

const QuizCategoriesForm: React.FC<Properties> = ({
	onSubmit = (): void => {},
}: Properties) => {
	const { control, getValues, handleSubmit, setValue } =
		useAppForm<QuizCategoriesFormFields>({
			defaultValues: QUIZ_CATEGORIES_FORM_DEFAULT_VALUES,
		});

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
		const { hasSelectedAll } = getValues();

		if (hasSelectedAll) {
			setValue(
				"categoryIds",
				quizCategories.map((category) => category.id.toString()),
			);
		} else {
			setValue("categoryIds", []);
		}
	}, [getValues, quizCategories, setValue]);

	const handleInputSelect = useCallback(() => {
		const { categoryIds } = getValues();

		const isAllChecked = categoryIds.length === quizCategories.length;

		if (isAllChecked) {
			setValue("hasSelectedAll", true);
		} else {
			setValue("hasSelectedAll", false);
		}
	}, [getValues, quizCategories.length, setValue]);

	const handleFormSubmit = useCallback(
		(event: React.BaseSyntheticEvent): void => {
			void handleSubmit(({ categoryIds }) => {
				onSubmit({ categoryIds: categoryIds.map(Number) });
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
					name="hasSelectedAll"
					onChange={handleSelectAll}
				/>
				<Checkbox
					control={control}
					label="Categories"
					name="categoryIds"
					onChange={handleInputSelect}
					options={categoryInputOptions}
				/>
				<br />
				<Button label="Retake Quiz" type="submit" />
			</form>
		</section>
	);
};

export { QuizCategoriesForm };
