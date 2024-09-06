import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type CheckboxInputOption,
	type Control,
	type FieldPath,
	type FieldValues,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	label: string;
	name: FieldPath<T>;
	options?: CheckboxInputOption[];
};

const Checkbox = <T extends FieldValues>({
	control,
	label,
	name,
	options = [],
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });
	const fieldValue = field.value;

	const handleCheckboxesChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const isChecked = event.target.checked;
			const inputValue = Number(event.target.value);

			if (isChecked) {
				field.onChange([...fieldValue, inputValue]);
			} else {
				field.onChange(
					(fieldValue as number[]).filter((value) => value !== inputValue),
				);
			}
		},
		[fieldValue, field],
	);

	return (
		<>
			<label className={styles["input-wrapper"]}>
				<p className={styles["question"]}>{label}</p>
				<div className={styles["input-container"]}>
					{options.map(({ label, value }) => {
						return (
							<div className={styles["gradient-border-container"]} key={value}>
								<div className={styles["gradient-border-content"]}>
									<label className={styles["label"]} key={value}>
										<input
											checked={(fieldValue as number[]).includes(value)}
											className={styles["input"]}
											onChange={handleCheckboxesChange}
											type="checkbox"
											value={value}
										/>
										<span className={styles["input-checkmark"]} />
										{label}
									</label>
								</div>
							</div>
						);
					})}
				</div>
			</label>
		</>
	);
};

export { Checkbox };
