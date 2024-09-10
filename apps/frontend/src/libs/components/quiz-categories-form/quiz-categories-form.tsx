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
	buttonLabel: string;
	onSubmit: (payload: { categoryIds: number[] }) => void;
};

const QuizCategoriesForm: React.FC<Properties> = ({
	buttonLabel,
	onSubmit,
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
	const categoryInputOptions: InputOption[] = quizCategories.map((category) => {
		const { id, name } = category;

		return { label: name, value: id.toString() };
	});

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

		setValue("hasSelectedAll", isAllChecked);
	}, [getValues, quizCategories.length, setValue]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(({ categoryIds }) => {
				onSubmit({ categoryIds: categoryIds.map(Number) });
			})(event_);
		},
		[onSubmit, handleSubmit],
	);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<section>
			<form onSubmit={handleFormSubmit}>
				<Checkbox
					control={control}
					hasVisuallyHiddenLabel
					label="All"
					name="hasSelectedAll"
					onChange={handleSelectAll}
					options={[]}
					variant="rounded"
				/>
				<Checkbox
					control={control}
					hasVisuallyHiddenLabel
					label="Categories"
					name="categoryIds"
					onChange={handleInputSelect}
					options={categoryInputOptions}
					variant="rounded"
				/>
				<br />
				<Button label={buttonLabel} type="submit" variant="secondary" />
			</form>
		</section>
	);
};

export { QuizCategoriesForm };
