import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type FieldErrors,
	type FieldValues,
	type FormFieldProperties,
	type IconName,
	type InputOption,
} from "~/libs/types/types.js";

import { Button } from "../button/button.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	errors?: FieldErrors<T>;
	hasVisuallyHiddenLabel?: boolean;
	iconName?: IconName;
	isDisabled?: boolean;
	isFullWidth?: boolean;
	label: string;
	onIconClick?: (() => void) | undefined;
	options?: InputOption[];
	placeholder?: string;
	type?: "email" | "password" | "radio" | "text";
} & FormFieldProperties<T>;

const Input = <T extends FieldValues>({
	control,
	errors,
	hasVisuallyHiddenLabel,
	iconName,
	isDisabled = false,
	isFullWidth = true,
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

	const isRadio = type === "radio";
	const isRadioWithOptions = isRadio && options?.length;

	const handleRadioChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			field.onChange(event.target.value);
		},
		[field],
	);

	return (
		<label
			className={getValidClassNames(
				styles["input-wrapper"],
				isRadioWithOptions && styles["radio-wrapper"],
			)}
		>
			<span
				className={getValidClassNames(
					styles["input-label"],
					isRadio && styles["radio-label"],
					hasVisuallyHiddenLabel && "visually-hidden",
				)}
			>
				{label}
			</span>
			<div className={styles["input-container"]}>
				{isRadioWithOptions ? (
					<div className={styles["radio-container"]}>
						{options.map((option) => (
							<label
								className={getValidClassNames(
									styles["radio-option"],
									isFullWidth && styles["full-width"],
								)}
								key={option.value}
							>
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
							disabled={isDisabled}
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
