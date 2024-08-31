import { useCallback, useEffect, useState } from "react";

import { Button } from "../components.js";
import { QuizCategoriesSelectionCheckbox } from "./libs/components/components.js";
import { useQuizCategories } from "./libs/hooks/hooks.js";

type InputState = {
	isChecked: boolean;
	label: string;
	value: number;
};

const QuizCategoriesSelection: React.FC = () => {
	const { isLoading, quizCategories } = useQuizCategories();
	const [inputStates, setInputStates] = useState<InputState[]>([]);

	useEffect(() => {
		setInputStates(
			quizCategories.map((category) => {
				return {
					isChecked: false,
					label: category.name,
					value: category.id,
				};
			}),
		);
	}, [quizCategories]);

	const isAllInputsChecked = inputStates.every((inputState) => {
		return inputState.isChecked;
	});

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => {
			const value = Number(event.target.value);

			setInputStates((previousInputStates) => {
				return previousInputStates.map((inputState) => {
					const { isChecked, label, value: stateValue } = inputState;

					if (stateValue !== value) {
						return inputState;
					}

					return { isChecked: !isChecked, label, value };
				});
			});
		},
		[],
	);

	const onAllInputClick: () => void = useCallback(() => {
		setInputStates((previousInputStates) => {
			return previousInputStates.map(({ label, value }) => {
				return { isChecked: !isAllInputsChecked, label, value };
			});
		});
	}, [isAllInputsChecked]);

	if (isLoading) {
		return <p>Loading quiz categories...</p>;
	}

	return (
		<section>
			<QuizCategoriesSelectionCheckbox
				checked={isAllInputsChecked}
				label="All"
				onClick={onAllInputClick}
				readOnly
				value="all"
			/>
			<form>
				{inputStates.map(({ isChecked, label, value }) => {
					return (
						<QuizCategoriesSelectionCheckbox
							checked={isChecked}
							key={value}
							label={label}
							onChange={onInputChange}
							value={value.toString()}
						/>
					);
				})}
				<Button label="Retake Quiz" type="submit" />
			</form>
		</section>
	);
};

export { QuizCategoriesSelection };
