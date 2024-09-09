import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	type InputOption,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	label: string;
	name: FieldPath<T>;
	options: InputOption[];
};

const Checkbox = <T extends FieldValues>({
	control,
	label,
	name,
	options,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });
	const { onChange, value } = field;

	const handleCheckboxesChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const isChecked = event.target.checked;
			const inputValue = Number(event.target.value);

			if (isChecked) {
				onChange([...value, inputValue]);
			} else {
				onChange((value as number[]).filter((value) => value !== inputValue));
			}
		},
		[onChange, value],
	);

	return (
		<label className={styles["input-wrapper"]}>
			<p className={styles["question"]}>{label}</p>
			<div className={styles["input-container"]}>
				{options.map((option) => {
					const isChecked = (value as number[]).includes(Number(option.value));

					return (
						<div
							className={styles["gradient-border-container"]}
							key={option.value}
						>
							<div className={styles["gradient-border-content"]}>
								<label className={styles["label"]} key={option.value}>
									<input
										checked={isChecked}
										className={styles["checkbox"]}
										onChange={handleCheckboxesChange}
										type="checkbox"
										value={option.value}
									/>
									<span className={styles["input-checkmark"]} />
									{option.label}
								</label>
							</div>
						</div>
					);
				})}
			</div>
		</label>
	);
};

export { Checkbox };
