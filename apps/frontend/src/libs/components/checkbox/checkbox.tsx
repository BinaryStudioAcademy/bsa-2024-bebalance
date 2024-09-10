import { ZERO_INDEX } from "~/libs/constants/constants.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type FieldValues,
	type FormFieldProperties,
	type InputOption,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	hasVisuallyHiddenLabel?: boolean;
	label: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	options: InputOption[];
	variant: "general" | "rounded";
} & FormFieldProperties<T>;

const Checkbox = <T extends FieldValues>({
	control,
	hasVisuallyHiddenLabel = false,
	label,
	name,
	onChange,
	options,
	variant,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });
	const { onChange: onFieldChange, value } = field;
	const isGeneralCheckbox = variant === "general";

	const handleCheckboxesChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const isChecked = event.target.checked;
			const rawInputValue = event.target.value;
			const inputValue = Number.isNaN(rawInputValue)
				? rawInputValue
				: Number(rawInputValue);

			if (isChecked) {
				onFieldChange([...value, inputValue]);
			} else {
				onFieldChange((value as []).filter((value) => value !== inputValue));
			}

			onChange?.(event);
		},
		[onFieldChange, onChange, value],
	);

	const handleSingleCheckboxChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			onFieldChange(event);
			onChange?.(event);
		},
		[onFieldChange, onChange],
	);

	return (
		<>
			<label className={styles["input-wrapper"]}>
				<p
					className={getValidClassNames(
						styles["question"],
						hasVisuallyHiddenLabel && "visually-hidden",
					)}
				>
					{label}
				</p>
				<div
					className={getValidClassNames(
						styles["input-container"],
						variant === "rounded" && styles["rounded-input-container"],
					)}
				>
					{options.map((option) => {
						const isChecked = (value as unknown[]).includes(option.value);

						return isGeneralCheckbox ? (
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
						) : (
							<label className={styles["rounded-label"]} key={option.value}>
								<input
									checked={isChecked}
									className={styles["checkbox"]}
									onChange={handleCheckboxesChange}
									type="checkbox"
									value={option.value}
								/>
								<span className={styles["checkmark"]} />
								{option.label}
							</label>
						);
					})}
				</div>
			</label>
			{options.length === ZERO_INDEX && (
				<label className={styles["rounded-label"]}>
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
		</>
	);
};

export { Checkbox };
