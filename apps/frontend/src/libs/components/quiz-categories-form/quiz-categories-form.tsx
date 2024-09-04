import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as categoriesActions } from "~/modules/categories/categories.js";

import { Button, Checkbox, Loader } from "../components.js";

type FormFields = {
	categoriesIds: string[];
	isSelectAll: boolean;
};

type Properties = {
	onSubmit?: (payload: Pick<FormFields, "categoriesIds">) => void;
};

const QuizCategoriesForm: React.FC<Properties> = ({
	onSubmit = (): void => {},
}: Properties) => {
	const { control, handleSubmit, setValue, watch } = useAppForm<FormFields>({
		defaultValues: { categoriesIds: [], isSelectAll: false },
	});

	const { isLoading, quizCategories } = useAppSelector(({ categories }) => {
		const { dataStatus, items } = categories;

		return {
			isLoading: dataStatus === DataStatus.PENDING,
			quizCategories: items,
		};
	});
	const { categoriesIds, isSelectAll } = watch();

	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(categoriesActions.getCategories());
	}, [dispatch]);

	useEffect(() => {
		const isAllChecked = categoriesIds.length === quizCategories.length;

		if (isAllChecked && !isSelectAll) {
			setValue("isSelectAll", true);
		} else if (!isAllChecked && isSelectAll) {
			setValue("isSelectAll", false);
		}
	}, [categoriesIds.length, isSelectAll, quizCategories, setValue]);

	const handleSelectAll = useCallback(() => {
		if (isSelectAll) {
			setValue("categoriesIds", []);
		} else {
			setValue(
				"categoriesIds",
				quizCategories.map((category) => category.id.toString()),
			);
		}
	}, [isSelectAll, quizCategories, setValue]);

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
					options={quizCategories.map((category) => ({
						label: category.name,
						value: category.id.toString(),
					}))}
				/>
				<br />
				<Button label="Retake Quiz" type="submit" />
			</form>
		</section>
	);
};

export { QuizCategoriesForm };
