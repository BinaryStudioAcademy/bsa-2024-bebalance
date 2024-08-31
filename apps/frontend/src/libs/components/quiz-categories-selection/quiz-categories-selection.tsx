import { useCallback, useEffect, useState } from "react";

import { DataStatus } from "~/libs/enums/enums.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as quizCategoriesActions } from "~/modules/quiz-categories/quiz-categories.js";

import { QuizCategoriesSelectionCheckbox } from "./libs/components/components.js";

type InputState = {
	isChecked: boolean;
	label: string;
	value: number;
};

const QuizCategoriesSelection: React.FC = () => {
	const dispatch = useAppDispatch();

	const isLoading = useAppSelector(
		({ quizCategories }) => quizCategories.dataStatus === DataStatus.PENDING,
	);
	const quizCategories = useAppSelector(
		({ quizCategories }) => quizCategories.items,
	);
	const [inputStates, setInputStates] = useState<InputState[]>([]);

	useEffect(() => {
		dispatch(quizCategoriesActions.fetchQuizCategories()).catch(() => {});
	}, [dispatch]);

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
			</form>
		</section>
	);
};

export { QuizCategoriesSelection };
