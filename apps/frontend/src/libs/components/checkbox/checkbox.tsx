import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type FieldValues,
	type FormFieldProperties,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	label: string;
	onClick?: () => void;
} & FormFieldProperties<T>;

const Checkbox = <T extends FieldValues>({
	control,
	label,
	name,
	onClick,
	options,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });
	const fieldValue = field.value;

	const handleCheckboxesChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const isChecked = event.target.checked;
			const inputValue = event.target.value;

			if (isChecked) {
				field.onChange([...fieldValue, inputValue]);
			} else {
				field.onChange(
					(fieldValue as string[]).filter((value) => value !== inputValue),
				);
			}
		},
		[fieldValue, field],
	);

	if (options?.length) {
		return (
			<>
				{options.map(({ label, value }) => {
					return (
						<label className={styles["container"]} key={value}>
							<input
								checked={(fieldValue as string[]).includes(value)}
								className={styles["input"]}
								onChange={handleCheckboxesChange}
								onClick={onClick}
								type="checkbox"
								value={value}
							/>
							<span className={styles["input-checkmark"]} />
							{label}
						</label>
					);
				})}
			</>
		);
	}

	return (
		<label className={styles["container"]}>
			<input
				{...field}
				checked={Boolean(fieldValue)}
				className={styles["input"]}
				onClick={onClick}
				type="checkbox"
			/>
			<span className={styles["input-checkmark"]} />
			{label}
		</label>
	);
};

export { Checkbox };
