import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
	type IconName,
} from "~/libs/types/types.js";

import { Button } from "../button/button.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors?: FieldErrors<T>;
	iconName?: IconName;
	label?: string;
	name: FieldPath<T>;
	onClick?: () => void;
	onIconClick?: () => void;
	options?: { label: string; value: string }[];
	placeholder?: string;
	type?: "checkbox" | "email" | "password" | "radio" | "text";
};

const Input = <T extends FieldValues>({
	control,
	errors,
	iconName,
	label,
	name,
	onClick,
	onIconClick,
	options,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });
	const fieldValue = field.value;

	const error = errors?.[name]?.message;
	const hasError = Boolean(error);
	const isRadioWithOptions = type === "radio" && options?.length;
	const isCheckbox = type === "checkbox";
	const isCheckboxWithOptions = isCheckbox && options?.length;

	const handleCheckboxChange = useCallback(
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

	const handleRadioChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			field.onChange(event.target.value);
		},
		[field],
	);

	if (isCheckboxWithOptions) {
		return (
			<>
				{options.map((option) => {
					return (
						<label className={styles["checkbox-container"]} key={option.value}>
							<input
								checked={(fieldValue as string[]).includes(option.value)}
								onChange={handleCheckboxChange}
								type={type}
								value={option.value}
							/>
							<span className={styles["checkbox-checkmark"]} />
							{option.label}
						</label>
					);
				})}
			</>
		);
	}

	if (isCheckbox) {
		return (
			<label className={styles["checkbox-container"]}>
				<input
					{...field}
					checked={Boolean(fieldValue)}
					onClick={onClick}
					type="checkbox"
				/>
				<span className={styles["checkbox-checkmark"]} />
				{label}
			</label>
		);
	}

	return (
		<label className={styles["input-wrapper"]}>
			<span
				className={getValidClassNames(
					styles["input-label"],
					options && styles["radio-label"],
				)}
			>
				{label}
			</span>
			<div className={styles["input-container"]}>
				{isRadioWithOptions ? (
					<div className={styles["radio-container"]}>
						{options.map((option) => (
							<label className={styles["radio-option"]} key={option.value}>
								<input
									checked={field.value === option.value}
									className={styles["radio-field"]}
									onChange={handleRadioChange}
									type="radio"
									value={option.value}
								/>
								{option.label}
							</label>
						))}
					</div>
				) : (
					<>
						<input
							className={getValidClassNames(styles["input-field"])}
							{...field}
							placeholder={placeholder}
							type={type}
						/>
						{iconName && (
							<Button
								hasVisuallyHiddenLabel
								iconName={iconName}
								label="Icon"
								onClick={onIconClick}
								type="button"
								variant="icon"
							/>
						)}
					</>
				)}
			</div>

			{hasError && (
				<span className={styles["input-error"]}>{error as string}</span>
			)}
		</label>
	);
};

export { Input };
