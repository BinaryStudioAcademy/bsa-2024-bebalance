import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import {
	actions as categoriesActions,
	type CategoryDto,
} from "~/modules/categories/categories.js";

import { Button, Input } from "../components.js";

const useQuizCategories = (): {
	isLoading: boolean;
	quizCategories: CategoryDto[];
} => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(categoriesActions.getCategories());
	}, [dispatch]);

	return useAppSelector(({ categories }) => {
		const { dataStatus, items } = categories;

		return {
			isLoading: dataStatus === DataStatus.PENDING,
			quizCategories: items,
		};
	});
};

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

	const { isLoading, quizCategories } = useQuizCategories();
	const { categoriesIds, isSelectAll } = watch();

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
		return <p>Loading quiz categories...</p>;
	}

	return (
		<section>
			<form onSubmit={handleFormSubmit}>
				<Input
					control={control}
					label="All"
					name="isSelectAll"
					onClick={handleSelectAll}
					type="checkbox"
				/>
				<Input
					control={control}
					name="categoriesIds"
					options={quizCategories.map((category) => ({
						label: category.name,
						value: category.id.toString(),
					}))}
					type="checkbox"
				/>
				<br />
				<Button label="Retake Quiz" type="submit" />
			</form>
		</section>
	);
};

export { QuizCategoriesForm };
