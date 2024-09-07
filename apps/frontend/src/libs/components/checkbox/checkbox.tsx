import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type FieldValues,
	type FormFieldProperties,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	label: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & FormFieldProperties<T>;

const Checkbox = <T extends FieldValues>({
	control,
	label,
	name,
	onChange,
	options,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });
	const { onChange: onFieldChange, value } = field;

	const handleCheckboxesChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const isChecked = event.target.checked;
			const inputValue = event.target.value;

			if (isChecked) {
				onFieldChange([...value, inputValue]);
			} else {
				onFieldChange(
					(value as string[]).filter((value) => value !== inputValue),
				);
			}

			onChange?.(event);
		},
		[onChange, onFieldChange, value],
	);

	const handleSingleCheckboxChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			onFieldChange(event);
			onChange?.(event);
		},
		[onChange, onFieldChange],
	);

	return (
		<section>
			{options?.length &&
				options.map(({ label, value: optionValue }) => {
					return (
						<label className={styles["container"]} key={optionValue}>
							<input
								checked={(value as string[]).includes(optionValue)}
								className={styles["checkbox"]}
								onChange={handleCheckboxesChange}
								type="checkbox"
								value={optionValue}
							/>
							<span className={styles["checkmark"]} />
							{label}
						</label>
					);
				})}
			{!options?.length && (
				<label className={styles["container"]}>
					<input
						{...field}
						checked={Boolean(value)}
						className={styles["checkbox"]}
						onChange={handleSingleCheckboxChange}
						type="checkbox"
					/>
					<span className={styles["checkmark"]} />
					{label}
				</label>
			)}
		</section>
	);
};

export { Checkbox };
