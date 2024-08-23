import crossedEye from "~/assets/img/crossed-eye.svg";
import eye from "~/assets/img/eye.svg";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors?: FieldErrors<T>;
	isDisplayedValue?: boolean;
	label: string;
	name: FieldPath<T>;
	onToggle?: () => void;
	options?: { label: string; value: string }[];
	placeholder?: string;
	type?: "email" | "password" | "radio" | "text";
};

const Input = <T extends FieldValues>({
	control,
	errors,
	isDisplayedValue = false,
	label,
	name,
	onToggle,
	options,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors?.[name]?.message;
	const hasError = Boolean(error);
	const isRadioWithOptions = type === "radio" && options?.length;

	const handleRadioChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			field.onChange(event.target.value);
		},
		[field],
	);

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
							type={type === "password" && isDisplayedValue ? "text" : type}
						/>
						{type === "password" && onToggle && (
							<button
								className={styles["toggle-password-icon"]}
								onClick={onToggle}
								type="button"
							>
								<img
									alt={isDisplayedValue ? "Hide password" : "Show password"}
									src={isDisplayedValue ? crossedEye : eye}
								/>
							</button>
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
