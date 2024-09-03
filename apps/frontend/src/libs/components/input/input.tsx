import { useMemo } from "react";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
	type IconName,
	type InputOption,
} from "~/libs/types/types.js";

import { Button } from "../button/button.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors?: FieldErrors<T>;
	iconName?: IconName;
	label: string;
	name: FieldPath<T>;
	onIconClick?: () => void;
	options?: InputOption[];
	placeholder?: string;
	type?: "checkbox" | "email" | "password" | "radio" | "text";
};

const Input = <T extends FieldValues>({
	control,
	errors,
	iconName,
	label,
	name,
	onIconClick,
	options,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors?.[name]?.message;
	const hasError = Boolean(error);
	const isRadioWithOptions = type === "radio" && options?.length;
	const isCheckboxWithOptions = type === "checkbox" && options?.length;
	const isDefaultInput = type !== "checkbox" && type !== "radio";
	const valueArray = useMemo(
		() => (Array.isArray(field.value) ? (field.value as string[]) : []),
		[field.value],
	);

	const handleRadioChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			field.onChange(event.target.value);
		},
		[field],
	);

	const handleCheckboxChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { checked, value } = event.target;
			const currentValue = valueArray;

			if (checked) {
				field.onChange([...currentValue, value]);
			} else {
				field.onChange(currentValue.filter((v) => v !== value));
			}
		},
		[valueArray, field],
	);

	// const handleCheckboxChange = useCallback(
	// 	(event: React.ChangeEvent<HTMLInputElement>) => {
	// 		const value = event.target.value;
	// 		const newValue = event.target.checked
	// 			? [...(field.value || []), value]
	// 			: (field.value || []).filter((v: string) => v !== value);

	// 		field.onChange(newValue);
	// 	},
	// 	[field],
	// );

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
				{isRadioWithOptions && (
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
				)}
				{isCheckboxWithOptions && (
					<div className={styles["checkbox-container"]}>
						{options.map(({ label, value }) => (
							<div className={styles["gradient-border-container"]} key={value}>
								<div className={styles["gradient-border-content"]}>
									<label className={styles["checkbox-label"]} key={value}>
										<input
											checked={valueArray.includes(value)}
											// checked={(field?.value as string[]).includes(value)}
											className={styles["checkbox-field"]}
											onChange={handleCheckboxChange}
											type="checkbox"
											value={value}
										/>
										{label}
									</label>
								</div>
							</div>
						))}
					</div>
				)}
				{isDefaultInput && (
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
