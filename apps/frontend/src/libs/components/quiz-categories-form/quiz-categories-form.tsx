import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";

import { Button } from "../components.js";
import { useQuizCategories } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

type FormFields = {
	categoriesIds: string[];
};

type Properties = {
	onSubmit?: (payload: FormFields) => void;
};

const QuizCategoriesForm: React.FC<Properties> = ({
	onSubmit = (): void => {},
}: Properties) => {
	const { handleSubmit, register, setValue, watch } = useAppForm<FormFields>({
		defaultValues: { categoriesIds: [] },
	});

	const { isLoading, quizCategories } = useQuizCategories();
	const isAllInputsChecked =
		watch("categoriesIds").length === quizCategories.length;

	const handleAllInputClick: () => void = useCallback(() => {
		setValue(
			"categoriesIds",
			isAllInputsChecked
				? []
				: quizCategories.map((category) => category.id.toString()),
		);
	}, [isAllInputsChecked, quizCategories, setValue]);

	const handleFormSubmit = useCallback(
		(event: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event);
		},
		[handleSubmit, onSubmit],
	);

	if (isLoading) {
		return <p>Loading quiz categories...</p>;
	}

	return (
		<section>
			<label className={styles["input-container"]}>
				<input
					checked={isAllInputsChecked}
					onClick={handleAllInputClick}
					readOnly
					type="checkbox"
				/>
				<span className={styles["input-checkmark"]} />
				All
			</label>
			<form onSubmit={handleFormSubmit}>
				{quizCategories.map(({ id, name }) => {
					return (
						<label className={styles["input-container"]} key={id}>
							<input
								type="checkbox"
								{...register("categoriesIds")}
								value={id}
							/>
							<span className={styles["input-checkmark"]} />
							{name}
						</label>
					);
				})}
				<br />
				<Button label="Retake Quiz" type="submit" />
			</form>
		</section>
	);
};

export { QuizCategoriesForm };
