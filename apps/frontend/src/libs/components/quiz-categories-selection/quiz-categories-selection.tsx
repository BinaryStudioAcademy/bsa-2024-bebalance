import { useCallback, useState } from "react";

import { QuizCategoriesSelectionCheckbox } from "./libs/components/components.js";

type InputState = {
	isChecked: boolean;
	label: string;
	value: number;
};

const categories = [
	{ id: 1, name: "Physical" },
	{ id: 2, name: "Work" },
	{ id: 3, name: "Friends" },
];

const QuizCategoriesSelection: React.FC = () => {
	const [inputStates, setInputStates] = useState<InputState[]>(
		categories.map(({ id, name }) => {
			return { isChecked: false, label: name, value: id };
		}),
	);

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
